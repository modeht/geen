import {
	BadRequestException,
	GoneException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AuthContext } from 'src/auth/auth.context';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { MediaEntity } from 'src/media/entities/media.entity';
import { SetLikeDto } from 'src/posts/dto/set-like.dto';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource, IsNull, MoreThan, Not, SelectQueryBuilder } from 'typeorm';
import { CreateStoryDto } from './dto/create-story.dto';

import { UsersService } from '../users/services/users.service';
import { StoryEntity } from './entities/story.entity';

@Injectable()
export class StoriesService {
	constructor(
		private datasource: DataSource,
		private authContext: AuthContext,
		private readonly usersService: UsersService,
	) {}

	private _buildQuery(postedById?: number): SelectQueryBuilder<UserEntity> {
		const userId = this.authContext.getUser().sub;

		const queryBuilder = this.datasource.manager
			.createQueryBuilder(UserEntity, 'user')
			.setFindOptions({ loadEagerRelations: true })
			.innerJoinAndSelect('user.stories', 'story', 'story.postedById = user.id')
			.leftJoinAndSelect('story.media', 'media')
			.addSelect(
				(subQuery) =>
					subQuery
						.addSelect('COUNT(*) > 0')
						.from('stories_liked_by_users', 'slbu')
						.where('slbu.storyId = story.id')
						.andWhere('slbu.userId = :userId', { userId })
						.limit(1),
				'story_isLiked',
			);

		if (postedById) queryBuilder.where('story."postedById" = :id', { id: postedById });

		return queryBuilder;
	}

	async create(createStoryDto: CreateStoryDto) {
		const userId = this.authContext.getUser().sub;

		const newStory = new StoryEntity();
		newStory.background = createStoryDto.background;
		newStory.text = createStoryDto.text;
		newStory.taggedProductsCount = createStoryDto.taggedProducts?.length || 0;
		newStory.taggedUsersCount = createStoryDto.taggedUsersIds?.length || 0;

		newStory.media = {
			id: createStoryDto.mediaId,
		} as MediaEntity;

		newStory.postedBy = {
			id: userId,
		} as UserEntity;

		newStory.taggedProducts = createStoryDto.taggedProducts?.map(
			({ productId, affiliationLinkId }) =>
				({
					product: { id: productId },
					...(affiliationLinkId && {
						affiliationLink: {
							productId: productId,
							id: affiliationLinkId,
						},
					}),
				}) as TaggedProductEntity,
		);

		newStory.taggedUsers = createStoryDto.taggedUsersIds?.map((uid) => ({
			id: uid,
		})) as UserEntity[];

		try {
			const created = await this.datasource.manager.save(StoryEntity, newStory);
			return created;
		} catch (e) {
			console.error(e);
			throw new BadRequestException(
				'Failed to create story, please check the data provided',
			);
		}
	}

	async findAll(pagination: Paginated, postedById?: number) {
		const past24Hours = new Date();
		past24Hours.setDate(past24Hours.getDate() - 1);

		const queryBuilder = this._buildQuery(postedById);
		const [stories, totalCount] = await queryBuilder
			.andWhere('story.createdAt > :past24Hours', { past24Hours })
			.orderBy('story.createdAt', 'DESC')
			.take(pagination.limit)
			.skip(pagination.page * pagination.limit)
			.getManyAndCount();
		return { stories, totalCount };
	}

	async findOne(storyId: number, throwIfNotFound = true) {
		const story = await this.datasource.manager.findOne(StoryEntity, {
			where: { id: storyId },
			relations: { media: true },
		});
		if (!story && throwIfNotFound) throw new NotFoundException('Story not found');
		const past24Hours = new Date();
		past24Hours.setDate(past24Hours.getDate() - 1);
		if (story.createdAt < past24Hours) {
			throw new GoneException('Story has expired');
		}
		return story;
	}
	async findFeed(pagination: Paginated) {
		const userId = this.authContext.getUser().sub;
		console.log(userId);

		const past24Hours = new Date();
		past24Hours.setDate(past24Hours.getDate() - 1);

		const queryBuilder = this._buildQuery();
		const [stories, totalCount] = await queryBuilder
			.addSelect('CASE WHEN user.id = :userId THEN 1 ELSE 0 END', 'is_mine')
			.where('story.createdAt > :past24Hours', { past24Hours })
			.andWhere(
				'(user.id IN (SELECT "followingId" FROM user_follows WHERE "followerId" = :userId) OR story.postedById = :userId)',
				{ userId },
			)
			.orderBy('is_mine', 'DESC')
			.addOrderBy('story.createdAt', 'DESC')
			.take(pagination.limit)
			.skip(pagination.page * pagination.limit)
			.getManyAndCount();
		return { stories, totalCount };
	}

	async findLikes(storyId: number, pagination: Paginated) {
		const userId = this.authContext.getUser().sub;

		return this.usersService.findAll({
			where: {
				id: Not(userId),
				likedStories: { storyId, story: { postedById: userId } },
			},
			take: pagination.limit,
			skip: pagination.page * pagination.limit,
		});
	}

	async findTaggedBrands(storyId: number, pagination: Paginated) {
		const past24Hours = new Date();
		past24Hours.setDate(past24Hours.getDate() - 1);

		return this.usersService.findAll({
			where: {
				brandProfile: { id: Not(IsNull()) },
				taggedInStories: { id: storyId, createdAt: MoreThan(past24Hours) },
			},
			take: pagination.limit,
			skip: pagination.page * pagination.limit,
		});
	}

	async findTaggedPeople(storyId: number, pagination: Paginated) {
		const past24Hours = new Date();
		past24Hours.setDate(past24Hours.getDate() - 1);
		return this.usersService.findAll({
			where: {
				shopperProfile: { id: Not(IsNull()) },
				taggedInStories: { id: storyId, createdAt: MoreThan(past24Hours) },
			},
			take: pagination.limit,
			skip: pagination.page * pagination.limit,
		});
	}

	async findTaggedProducts(storyId: number, pagination: Paginated) {
		const [taggedProducts, totalCount] = await this.datasource.manager.findAndCount(
			TaggedProductEntity,
			{
				where: { storyId },
				relations: { product: { media: true, brand: true }, affiliationLink: true },
				take: pagination.limit,
				skip: pagination.page * pagination.limit,
			},
		);
		return { taggedProducts, totalCount };
	}

	async setLike(storyId: number, setLikeDto: SetLikeDto) {
		const userId = this.authContext.getUser().sub;
		const isLiked = setLikeDto.isLiked;
		if (isLiked) return this._addLike(storyId, userId);
		return this._removeLike(storyId, userId);
	}

	async _addLike(storyId: number, userId: number) {
		try {
			await this.datasource.manager.insert('stories_liked_by_users', {
				storyId,
				userId,
			});
			return { isLiked: true };
		} catch (e) {
			throw new BadRequestException(
				'Failed to like story, make sure you have not already liked the story and story exists',
			);
		}
	}
	async _removeLike(storyId: number, userId: number) {
		try {
			await this.datasource.manager.delete('stories_liked_by_users', {
				storyId,
				userId,
			});
			return { isLiked: false };
		} catch (e) {
			throw new BadRequestException(
				'Failed to unlike story, make sure you have already liked the story and story exists',
			);
		}
	}

	async remove(storyId: number) {
		const postedById = this.authContext.getUser().sub;
		const story = await this.datasource.manager.findOne(StoryEntity, {
			where: { id: storyId, postedById },
		});
		if (!story) throw new NotFoundException('Story not found');
		await this.datasource.manager.delete(StoryEntity, storyId);
		return story;
	}
}
