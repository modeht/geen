import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Utils } from 'lib/utils';
import { AuthContext } from 'src/auth/auth.context';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { MediaEntity } from 'src/media/entities/media.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
	DataSource,
	FindOptionsRelations,
	IsNull,
	Not,
	SelectQueryBuilder,
} from 'typeorm';
import { addIsFollowingToQuery, addUserEngagementToQuery } from '../users/common-queries';
import { UsersService } from '../users/services/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FindPostsDto } from './dto/find-posts.dto';
import { SetLikeDto } from './dto/set-like.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
	constructor(
		private datasource: DataSource,
		private authContext: AuthContext,
		private readonly usersService: UsersService,
	) {}

	private _buildQuery(
		findPostsDto: FindPostsDto,
		relations: FindOptionsRelations<PostEntity>,
	): SelectQueryBuilder<PostEntity> {
		const userId = this.authContext.getUser().sub;
		const { postedById, productId, taggedUserId } = findPostsDto;

		const queryBuilder = this.datasource.manager
			.createQueryBuilder(PostEntity, 'post')
			.addSelect(
				(subQuery) =>
					subQuery
						.addSelect('COUNT(*) > 0')
						.from('posts_liked_by_users', 'plbu')
						.where('plbu.postId = post.id')
						.andWhere('plbu.userId = :userId', { userId })
						.limit(1),
				'post_isLiked',
			)
			.leftJoinAndSelect(
				'post.savedInCollections',
				'savedInCollections',
				'savedInCollections.userId = :userId',
				{ userId },
			)

			.leftJoinAndSelect('post.media', 'media')
			.leftJoinAndSelect('post.thumbnail', 'thumbnail');

		Utils.applyRelationsToQueryBuilder('post', relations, queryBuilder);

		if ('postedBy' in relations) {
			addIsFollowingToQuery(userId, 'post_postedBy', queryBuilder);
			addUserEngagementToQuery('post_postedBy', queryBuilder, false);
		}

		if (postedById)
			queryBuilder.andWhere('post.postedById = :postedById', { postedById });

		if (productId) {
			queryBuilder.andWhere(
				(qb) =>
					'EXISTS ' +
					qb
						.subQuery()
						.select('1')
						.from('tagged_products', 'tp')
						.where('tp.postId = post.id')
						.andWhere('tp.productId = :productId')
						.getQuery(),
				{ productId },
			);
		}

		if (taggedUserId) {
			queryBuilder.andWhere(
				(qb) =>
					'EXISTS ' +
					qb
						.subQuery()
						.select('1')
						.from('posts_tagged_users', 'ptu')
						.where('ptu.postId = post.id')
						.andWhere('ptu.userId = :taggedUserId')
						.getQuery(),
				{ taggedUserId },
			);
		}

		return queryBuilder;
	}

	async findAll(
		findPostsDto: FindPostsDto,
		relations: FindOptionsRelations<PostEntity>,
		pagination: Paginated,
	) {
		const queryBuilder = this._buildQuery(findPostsDto, relations);
		const [posts, totalCount] = await queryBuilder
			.orderBy('post.createdAt', 'DESC')
			.take(pagination.limit)
			.skip(pagination.page * pagination.limit)
			.getManyAndCount();
		return { posts, totalCount };
	}

	async findOne(
		postId: number,
		relations: FindOptionsRelations<PostEntity>,
		throwIfNotFound = true,
	) {
		const queryBuilder = this._buildQuery({}, relations);
		const post = await queryBuilder.andWhere('post.id = :postId', { postId }).getOne();
		if (!post && throwIfNotFound) throw new NotFoundException('Post not found');
		return post;
	}

	async findFeed(relations: FindOptionsRelations<PostEntity>, pagination: Paginated) {
		const userId = this.authContext.getUser().sub;
		const queryBuilder = this._buildQuery({}, relations);
		const [posts, totalCount] = await queryBuilder
			.where(
				'post.postedById IN (SELECT "followingId" FROM user_follows WHERE "followerId" = :userId)',
			)
			.orWhere('post.postedById = :userId')
			.setParameters({ userId })
			// TODO: add orderBy not viewd by user later
			.orderBy('post.createdAt', 'DESC')
			.take(pagination.limit)
			.skip(pagination.page * pagination.limit)
			.getManyAndCount();
		return { posts, totalCount };
	}
	async findLikes(postId: number, pagination: Paginated) {
		const userId = this.authContext.getUser().sub;
		return this.usersService.findAll({
			where: {
				id: Not(userId),
				likedPosts: { postId },
			},
			take: pagination.limit,
			skip: pagination.page * pagination.limit,
		});
	}
	async findTaggedBrands(postId: number, pagination: Paginated) {
		return this.usersService.findAll({
			where: {
				brandProfile: { id: Not(IsNull()) },
				taggedInPosts: { id: postId },
			},
			take: pagination.limit,
			skip: pagination.page * pagination.limit,
		});
	}

	async findTaggedPeople(postId: number, pagination: Paginated) {
		return this.usersService.findAll({
			where: {
				shopperProfile: { id: Not(IsNull()) },
				taggedInPosts: { id: postId },
			},
			take: pagination.limit,
			skip: pagination.page * pagination.limit,
		});
	}

	async findTaggedProducts(postId: number, pagination: Paginated) {
		const [taggedProducts, totalCount] = await this.datasource.manager.findAndCount(
			TaggedProductEntity,
			{
				where: {
					postId: postId,
				},
				relations: { product: { media: true, brand: true }, affiliationLink: true },
				take: pagination.limit,
				skip: pagination.page * pagination.limit,
			},
		);
		return { taggedProducts, totalCount };
	}

	// TODO: Add check for tagged products, taggedUsers and media existance + affiliationLinks consistency(afflink could belong to another product/user) (For better error messages)
	// TODO: notify users tagged in the post
	async create(createPostDto: CreatePostDto) {
		const userId = this.authContext.getUser().sub;

		const newPost = new PostEntity();
		newPost.caption = createPostDto.caption;
		newPost.taggedProductsCount = createPostDto.taggedProducts?.length ?? 0;
		newPost.taggedUsersCount = createPostDto.taggedUsersIds?.length ?? 0;
		newPost.thumbnailId = createPostDto.thumbnailId;

		newPost.media = createPostDto.media?.map((mid) => ({
			id: mid,
		})) as MediaEntity[];

		newPost.postedBy = {
			id: userId,
		} as UserEntity;

		newPost.taggedProducts = createPostDto.taggedProducts?.map(
			({ productId, affiliationLinkId }) =>
				({
					product: { id: productId },
					affiliationLink: {
						productId: productId,
						id: affiliationLinkId,
					},
				}) as TaggedProductEntity,
		);

		newPost.taggedUsers = createPostDto.taggedUsersIds?.map((uid) => ({
			id: uid,
		})) as UserEntity[];

		try {
			const [created, postedBy] = await Promise.all([
				this.datasource.manager.save(PostEntity, newPost),
				this.datasource.manager.findOne(UserEntity, {
					where: { id: userId },
					relations: {
						shopperProfile: { profilePicture: true },
						brandProfile: { logo: true, cover: true },
					},
				}),
			]);
			created.postedBy = postedBy;

			return created;
		} catch (e) {
			throw new BadRequestException(
				'Failed to create post, please check the provided data',
			);
		}
	}

	async setLike(postId: number, setLikeDto: SetLikeDto) {
		const userId = this.authContext.getUser().sub;
		const isLiked = setLikeDto.isLiked;
		if (isLiked) return this._addLike(postId, userId);
		else return this._removeLike(postId, userId);
	}

	private async _addLike(postId: number, userId: number) {
		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();
		try {
			await tr.manager.insert('posts_liked_by_users', { postId, userId });
			await tr.manager.increment(PostEntity, { id: postId }, 'likesCount', 1);
			await tr.commitTransaction();
			return { isLiked: true };
		} catch (error) {
			await tr.rollbackTransaction();
			throw new BadRequestException(
				'Failed to like post, make sure you have not already liked the post and post exists',
			);
		} finally {
			await tr.release();
		}
	}

	private async _removeLike(postId: number, userId: number) {
		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();
		try {
			const deleteResult = await tr.manager.delete('posts_liked_by_users', {
				postId,
				userId,
			});

			if (deleteResult.affected === 0)
				throw new BadRequestException(
					'Failed to unlike post, make sure you have already liked the post and post exists',
				);

			await tr.manager.decrement(PostEntity, { id: postId }, 'likesCount', 1);
			await tr.commitTransaction();
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}

		return { isLiked: false };
	}

	async remove(postId: number) {
		const postedById = this.authContext.getUser().sub;
		const post = await this.datasource.manager.findOne(PostEntity, {
			where: { id: postId },
		});
		if (!post) throw new NotFoundException('Post not found');
		if (post.postedBy.id !== postedById) throw new ForbiddenException();
		await this.datasource.manager.delete(PostEntity, postId);
		return post;
	}
}
