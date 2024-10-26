import { SelectQueryBuilder } from 'typeorm';

export function addIsFollowingToQuery<T>(
	userId: number,
	joinRelationName: string,
	queryBuilder: SelectQueryBuilder<T>,
) {
	queryBuilder.addSelect(
		(sq) =>
			sq
				.select('COUNT(*) > 0')
				.from('user_follows', 'uf')
				.where('uf."followerId" = :userId', { userId })
				.andWhere(`uf."followingId" = "${joinRelationName}"."id"`),
		`${joinRelationName}_isFollowing`,
	);
}

export function addIsBlockedByToQuery<T>(
	userId: number,
	joinRelationName: string,
	queryBuilder: SelectQueryBuilder<T>,
) {
	queryBuilder.addSelect(
		(sq) =>
			sq
				.select('COUNT(*) > 0')
				.from('user_blocks', 'ub')
				.where('ub."blockedId" = :userId', { userId })
				.andWhere(`ub."blockerId" = "${joinRelationName}"."id"`),
		`${joinRelationName}_isBlockedBy`,
	);
}

export function addUserEngagementToQuery<T>(
	joinRelationName: string,
	queryBuilder: SelectQueryBuilder<T>,
	addEngagementRate: boolean = false,
) {
	queryBuilder.addSelect(
		(sq) =>
			sq
				.select('COUNT(*)')
				.from('user_follows', 'uf')
				.where(`uf."followingId" = "${joinRelationName}"."id"`),
		`${joinRelationName}_followersCount`,
	);
	queryBuilder.addSelect(
		(sq) =>
			sq
				.select('COUNT(*)')
				.from('user_follows', 'uf')
				.where(`uf."followerId" = "${joinRelationName}"."id"`),
		`${joinRelationName}_followingCount`,
	);
	queryBuilder.addSelect(
		(sq) =>
			sq
				.select('COUNT(*)')
				.from('posts', 'p')
				.where(`p."postedById" = "${joinRelationName}"."id"`),
		`${joinRelationName}_postsCount`,
	);

	queryBuilder.addSelect(
		(sq) =>
			sq
				.select('COUNT(DISTINCT c."brandId")')
				.from('collaborations', 'c')
				.where(`c."shopperId" = "${joinRelationName}"."id"`),
		`${joinRelationName}_brandsCount`,
	);

	if (addEngagementRate) {
		addEngagementRateToQuery(joinRelationName, queryBuilder);
	}
}

export function addEngagementRateToQuery<T>(
	joinRelationName: string,
	queryBuilder: SelectQueryBuilder<T>,
) {
	queryBuilder.addSelect(
		(sq) =>
			sq
				.select(
					'(COUNT(DISTINCT comment.id) + ' +
						'COUNT(DISTINCT(plbu."userId", plbu."postId")) + ' +
						'COUNT(DISTINCT m."id") + ' +
						'COUNT(DISTINCT(sc."savedCollectionId", sc."postId")))',
					'engagmentCount',
				)
				.from('posts', 'p')
				.leftJoin('comments', 'comment', 'comment."postId" = p.id')
				.leftJoin('posts_liked_by_users', 'plbu', 'plbu."postId" = p.id')
				.leftJoin('messages', 'm', 'm."postId" = p.id')
				.leftJoin('saved_collection_items', 'sc', 'sc."postId" = p.id')
				.where(`p."postedById" = "${joinRelationName}"."id"`),
		`${joinRelationName}_engagementCount`,
	);
}

export function addHasStoryToQuery<T>(
	joinRelationName: string,
	queryBuilder: SelectQueryBuilder<T>,
) {
	const past24Hours = new Date();
	past24Hours.setDate(past24Hours.getDate() - 1);
	queryBuilder.addSelect(
		(sq) =>
			sq
				.select('COUNT(*) > 0')
				.from('stories', 's')
				.where(`s."postedById" = "${joinRelationName}"."id"`)
				.andWhere(`s."createdAt" > :past24Hours`, { past24Hours }),
		`${joinRelationName}_hasStory`,
	);
}
