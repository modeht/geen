import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import { AuthContext } from '../auth/auth.context';
import { Paginated } from '../globals/dto/paginated.dto';
import { CommentEntity } from '../comments/entities/comment.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { PostLikesEntity } from '../posts/entities/posts-likes.entity';
import { StoryLikesEntity } from '../stories/entities/stories-likes.entity';
import { Role } from '../auth/types';
import { UserEntity } from '../users/entities/user.entity';
import { SavedCollectionItemEntity } from '../saved-collections/entities/saved-collection-item.entity';

@Injectable()
export class BrandEngagementsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	private userSelectDetails = {
		brandProfile: {
			brandName: true,
			storeName: true,
			logo: { id: true, url: true },
		},
		shopperProfile: {
			username: true,
			fullName: true,
			profilePicture: { id: true, url: true },
		},
	};

	async getCommentsEngagement(paginated: Paginated) {
		const brandId = this.authContext.getUser().sub;
		const [comments, totalCount] = await this.dataSource.manager.findAndCount(
			CommentEntity,
			{
				select: {
					id: true,
					createdAt: true,
					content: true,
					postId: true,
					commentor: this.userSelectDetails,
				},
				where: { post: { postedById: brandId } },
				relations: {
					post: true,
					commentor: true,
				},

				take: paginated.limit,
				skip: paginated.limit * paginated.page,
				order: { createdAt: 'DESC' },
			},
		);
		return { comments, totalCount };
	}

	async getLikesEngagement(paginated: Paginated) {
		const brandId = this.authContext.getUser().sub;
		const postLikesQuery = this.dataSource.manager
			.createQueryBuilder(PostLikesEntity, 'postLikes')
			.select([
				"'post' AS type",
				'postLikes.createdAt AS createdAt',
				'postLikes.postId AS postId',
				'NULL AS storyId',
				'postLikes.userId AS userId',
				'post.caption AS caption',
				'NULL AS text',
			])
			.leftJoin('postLikes.post', 'post')
			.where(`post.postedById =  ${brandId}`);

		const storyLikesQuery = this.dataSource.manager
			.createQueryBuilder(StoryLikesEntity, 'storyLikes')
			.select([
				"'story' AS type",
				'storyLikes.createdAt AS createdAt',
				'NULL AS postId',
				'storyLikes.storyId AS storyId',
				'storyLikes.userId AS userId',
				'NULL AS caption',
				'story.text AS text',
			])
			.leftJoin('storyLikes.story', 'story')
			.where(`story.postedById = ${brandId}`);

		const combinedQuery = this.dataSource.manager
			.createQueryBuilder()
			.select(['createdAt', 'postId', 'storyId', 'userId', 'caption', 'text', 'type'])
			.from(
				'(' + postLikesQuery.getQuery() + ' UNION ' + storyLikesQuery.getQuery() + ')',
				'likes',
			)
			.leftJoin('users', 'user', 'user.id = likes.userId')
			.leftJoin('user.shopperProfile', 'shopperProfile')
			.leftJoin('shopperProfile.profilePicture', 'profilePicture')
			.leftJoin('user.brandProfile', 'brandProfile')
			.leftJoin('brandProfile.logo', 'logo')
			.addSelect(
				'CASE WHEN shopperProfile.id IS NOT NULL THEN shopperProfile.username ELSE brandProfile.brandName END',
				'display_name',
			)
			.addSelect(
				'CASE WHEN shopperProfile.id IS NOT NULL THEN profilePicture.url ELSE logo.url END',
				'display_picture',
			)
			.addSelect(
				"CASE WHEN shopperProfile.id IS NOT NULL THEN 'shopper' ELSE 'brand' END",
				'user_role',
			)
			.orderBy('createdAt', 'DESC')
			.limit(paginated.limit)
			.offset(paginated.limit * paginated.page);

		const countQuery = this.dataSource.manager
			.createQueryBuilder()
			.select('COUNT(*)', 'totalCount')
			.from(
				'(' + postLikesQuery.getQuery() + ' UNION ' + storyLikesQuery.getQuery() + ')',
				'likes',
			);

		const [likes, totalCount] = await Promise.all([
			combinedQuery.getRawMany(),
			countQuery.getRawOne(),
		]);
		return { likes, totalCount: +totalCount.totalCount };
	}

	async getPostsLikesEngagement(paginated: Paginated) {
		const brandId = this.authContext.getUser().sub;
		const [likes, totalCount] = await this.dataSource.manager.find(PostLikesEntity, {
			select: {
				createdAt: true,
				postId: true,
				user: this.userSelectDetails,
				post: { caption: true },
			},
			relations: {
				post: true,
				user: true,
			},
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
			where: { post: { postedById: brandId } },
			order: { createdAt: 'DESC' },
		});

		return { likes, totalCount };
	}

	async getStoriesLikesEngagement(paginated: Paginated) {
		const brandId = this.authContext.getUser().sub;
		const [likes, totalCount] = await this.dataSource.manager.find(StoryLikesEntity, {
			select: {
				createdAt: true,
				storyId: true,
				user: this.userSelectDetails,
				story: { text: true },
			},
			relations: {
				story: true,
				user: true,
			},
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
			where: { story: { postedById: brandId } },
			order: { createdAt: 'DESC' },
		});

		return { likes, totalCount };
	}

	async getSavesEngagement(paginated: Paginated) {
		const userId = this.authContext.getUser().sub;
		const [saves, totalCount] = await this.dataSource.manager
			.createQueryBuilder(SavedCollectionItemEntity, 'saves')
			.select([
				'saves.createdAt',
				'saves.postId',
				'saves.productId',
				'post',
				'product',
				'media',
				'thumbnail',
			])
			.leftJoin('saves.post', 'post')
			.leftJoin('post.media', 'media')
			.leftJoin('post.thumbnail', 'thumbnail')
			.leftJoin('saves.product', 'product')
			.leftJoin('product.media', 'productMedia')
			.where('saves.userId != :userId', { userId })
			.andWhere(
				new Brackets((qb) => {
					qb.where('product.brandId = :brandId', { brandId: userId }).orWhere(
						'post.postedById = :brandId',
						{ brandId: userId },
					);
				}),
			)

			.orderBy('saves.createdAt', 'DESC')
			.limit(paginated.limit)
			.offset(paginated.limit * paginated.page)
			.getManyAndCount();

		return { saves, totalCount };
	}

	async getSharesEngagement(paginated: Paginated) {
		const brandId = this.authContext.getUser().sub;
		const [shares, totalCount] = await this.dataSource.manager
			.createQueryBuilder(MessageEntity, 'message')
			.select([
				'message.createdAt',
				'message.postId',
				'post',
				'thumbnail',
				'media',
				'from',
				'shopperProfile',
				'brandProfile',
			])
			.leftJoin('message.post', 'post')
			.leftJoin('post.media', 'media')
			.leftJoin('post.thumbnail', 'thumbnail')
			.leftJoin('message.from', 'from')
			.leftJoin('from.shopperProfile', 'shopperProfile')
			.leftJoin('from.brandProfile', 'brandProfile')

			.where('message.toId != :brandId', { brandId })
			.andWhere('message.fromId != :brandId', { brandId })
			.andWhere('post.postedById = :brandId', { brandId })
			.orderBy('message.createdAt', 'DESC')
			.limit(paginated.limit)
			.offset(paginated.limit * paginated.page)
			.getManyAndCount();

		shares.forEach((message) => {
			message.from = {
				role: message.from.shopperProfile
					? message.from.shopperProfile.isOutfitter
						? Role.Outfitter
						: Role.Shopper
					: Role.Brand,
			} as UserEntity;
		});

		return { shares, totalCount };
	}
}
