import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthContext } from '../../auth/auth.context';
import { Paginated } from '../../globals/dto/paginated.dto';
import { ShopperProfileEntity } from '../entities/shopper-profile.entity';
import { addIsFollowingToQuery, addUserEngagementToQuery } from './../common-queries';

@Injectable()
export class OutfittersService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	async findOne(id: number) {
		return this.dataSource.manager.findOne(ShopperProfileEntity, {
			where: { id, isOutfitter: true },
		});
	}

	async findAll(paginated: Paginated) {
		const userId = this.authContext.getUser()!.sub;
		const qb = this.dataSource.manager
			.createQueryBuilder(ShopperProfileEntity, 'shopperProfile')
			.setFindOptions({
				loadEagerRelations: true,
				take: paginated.limit,
				skip: paginated.limit * paginated.page,
				where: {
					isOutfitter: true,
				},
			});
		addIsFollowingToQuery(userId, 'shopperProfile', qb);
		addUserEngagementToQuery('shopperProfile', qb, true);

		const [outfitters, totalCount] = await qb.getManyAndCount();
		return { outfitters, totalCount };
	}

	// TODO: adjust criteria for suggestions
	async findSuggestions(paginated: Paginated) {
		const brandId = this.authContext.getUser()!.sub;
		const qb = this.dataSource
			.createQueryBuilder(ShopperProfileEntity, 'shopperProfile')
			.leftJoinAndSelect('shopperProfile.profilePicture', 'profilePicture')
			.innerJoin('shopperProfile.preferences', 'shopperPreference')
			.innerJoin(
				'brands_preferences',
				'brandPreference',
				'brandPreference.preferenceId = shopperPreference.id AND brandPreference.brandId = :brandId',
				{ brandId },
			)
			.addSelect('COUNT(brandPreference.preferenceId)', 'common_interest_count')
			.where('shopperProfile.isOutfitter = true')
			.groupBy('shopperProfile.id')
			.addGroupBy('profilePicture.id')
			.orderBy(`common_interest_count`, 'DESC')
			.take(paginated.limit)
			.skip(paginated.limit * paginated.page);

		addIsFollowingToQuery(brandId, 'shopperProfile', qb);
		addUserEngagementToQuery('shopperProfile', qb, true);

		const [outfitters, totalCount] = await qb.getManyAndCount();
		return { outfitters, totalCount };
	}
}
