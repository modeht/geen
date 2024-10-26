import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { Utils } from '../../../lib/utils';
import { AuthContext } from '../../auth/auth.context';
import { PrimitiveFields } from '../../globals/lib/type-helpers';
import { MediaEntity } from '../../media/entities/media.entity';
import {
	addHasStoryToQuery,
	addIsFollowingToQuery,
	addUserEngagementToQuery,
} from '../common-queries';
import { ManageBrandProfileDto } from '../dto/manage-brand-profile.dto';
import { BrandProfileEntity } from '../entities/brand-profile.entity';

@Injectable()
export class BrandsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	private noneNullableFields: Record<keyof PrimitiveFields<BrandProfileEntity>, boolean> =
		{
			id: true,
			brandName: true,
			storeName: true,
			isPublished: true,
			shippingCost: true,
			brandManagerFullName: true,
			followersCount: false,
			followingCount: false,
			isFollowing: false,
			postsCount: false,
			hasStory: false,
			currency: false,
			storeBio: false,
			website: false,
			logoId: false,
		};

	private _buildQuery(opts: FindManyOptions<BrandProfileEntity>) {
		const userId = this.authContext.getUser().sub;
		const qb = this.dataSource.manager.createQueryBuilder(
			BrandProfileEntity,
			'brandProfile',
		);
		qb.setFindOptions({
			loadEagerRelations: true,
			...opts,
		});

		addIsFollowingToQuery(userId, 'brandProfile', qb);
		addUserEngagementToQuery('brandProfile', qb);
		addHasStoryToQuery('brandProfile', qb);

		return qb;
	}

	async exists(where: FindOptionsWhere<BrandProfileEntity>) {
		return this.dataSource.manager.exists(BrandProfileEntity, { where });
	}

	async manageProfile(payload: ManageBrandProfileDto) {
		const id = this.authContext.getUser().sub;
		Utils.validateNullProperties(
			payload,
			Object.keys(this.noneNullableFields)
				.filter((key) => this.noneNullableFields[key] === true)
				.map((k) => k),
		);
		const brand = await this.findOne({
			where: { user: { id } },
			relations: ['preferences'],
		});

		if (payload.name && payload.name != brand.storeName) {
			const storeNameExists = await this.exists({ storeName: payload.name });
			if (storeNameExists) throw new ConflictException('storeName already exists');
			brand.storeName = payload.name;
		}

		brand.brandName = Utils.updatePrimitiveField(brand.brandName, payload.brandName);
		brand.storeBio = Utils.updatePrimitiveField(brand.storeBio, payload.storeBio, {
			allowNull: true,
		});
		brand.website = Utils.updatePrimitiveField(brand.website, payload.website);
		brand.isPublished = Utils.updatePrimitiveField(
			brand.isPublished,
			payload.isPublished,
		);
		brand.shippingCost = Utils.updatePrimitiveField(
			brand.shippingCost,
			payload.shippingCost,
		);
		brand.logo = {
			id: Utils.updatePrimitiveField(brand.logoId, payload.logoId),
		} as MediaEntity;
		brand.cover = {
			id: Utils.updatePrimitiveField(brand.cover?.id, payload.coverId),
		} as MediaEntity;
		brand.preferences = Utils.updateMtMField(brand.preferences, payload.preferences);
		await this.dataSource.manager.save(brand);
		return this.findOne({ where: { id }, relations: ['preferences'] });
	}

	async findOne(opts: FindOneOptions<BrandProfileEntity>, throwIfNotFound = true) {
		const row = await this._buildQuery(opts).getOne();
		if (throwIfNotFound) {
			if (!row) {
				throw new NotFoundException('Record was not found');
			}
		}
		return row;
	}

	async findAll(opts: FindManyOptions<BrandProfileEntity>) {
		const [brands, totalCount] = await this._buildQuery(opts).getManyAndCount();
		return { brands, totalCount };
	}

	async findAllPublic() {
		return this.dataSource.manager
			.createQueryBuilder(BrandProfileEntity, 'brand')
			.setFindOptions({ loadEagerRelations: true })
			.addSelect(
				(sq) =>
					sq
						.select('COUNT(*)')
						.from('user_follows', 'uf')
						.where('uf."followingId" = brand.id'),
				'followers_count',
			)
			.orderBy('followers_count', 'DESC')
			.take(20)
			.getMany();
	}
}
