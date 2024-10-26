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
import { UpdateShopperProfileDto } from '../dto/update-shopper-profile.dto';
import { ShippingAddressEntity } from '../entities/shipping-address.entity';
import { ShopperProfileEntity } from '../entities/shopper-profile.entity';

@Injectable()
export class ShoppersService {
	private noneNullableFields: Record<
		keyof PrimitiveFields<ShopperProfileEntity>,
		boolean
	> = {
		id: true,
		bio: true,
		username: true,
		fullName: true,
		isOutfitter: true,
		dateOfBirth: true,
		onboardingStep: true,

		instagramProfileLink: false,
		facebookProfileLink: false,
		tiktokProfileLink: false,
		engagementCount: false,
		followersCount: false,
		followingCount: false,
		isFollowing: false,
		brandsCount: false,
		postsCount: false,
		hasStory: false,
		gender: false,
	};

	constructor(
		private readonly dataSource: DataSource,
		private readonly authContext: AuthContext,
	) {}

	private _buildQuery(opts: FindManyOptions<ShopperProfileEntity>) {
		const userId = this.authContext.getUser().sub;
		const qb = this.dataSource.manager.createQueryBuilder(
			ShopperProfileEntity,
			'shopperProfile',
		);
		qb.setFindOptions({
			loadEagerRelations: true,
			...opts,
		});

		addIsFollowingToQuery(userId, 'shopperProfile', qb);
		addUserEngagementToQuery('shopperProfile', qb);
		addHasStoryToQuery('shopperProfile', qb);

		return qb;
	}

	async exists(where: FindOptionsWhere<ShopperProfileEntity>) {
		return this.dataSource.manager.exists(ShopperProfileEntity, { where });
	}

	async findOne(opts: FindOneOptions<ShopperProfileEntity>, throwIfNotFound = true) {
		const shopperProfile = await this._buildQuery(opts).getOne();
		if (!shopperProfile && throwIfNotFound)
			throw new NotFoundException('Shopper not found');
		return shopperProfile;
	}

	async findAll(opts: FindManyOptions<ShopperProfileEntity>) {
		const [shoppers, totalCount] = await this._buildQuery(opts).getManyAndCount();
		return { shoppers, totalCount };
	}

	async update(id: number, updateShopperProfileDto: UpdateShopperProfileDto) {
		Utils.validateNullProperties(
			updateShopperProfileDto,
			Object.keys(this.noneNullableFields)
				.filter((key) => this.noneNullableFields[key] === true)
				.map((k) => k),
		);
		const shopperProfile = await this.findOne({
			where: { id },
			relations: {
				addresses: true,
				preferences: true,
				profilePicture: true,
			},
		});

		if (
			updateShopperProfileDto.username &&
			updateShopperProfileDto.username !== shopperProfile.username
		) {
			const exists = await this.exists({ username: updateShopperProfileDto.username });
			if (exists) throw new ConflictException('Username already exists');
			shopperProfile.username = updateShopperProfileDto.username;
		}
		if (
			updateShopperProfileDto.country ||
			updateShopperProfileDto.city ||
			updateShopperProfileDto.apartment ||
			updateShopperProfileDto.street
		) {
			this._updateDefaultAddress(shopperProfile, updateShopperProfileDto);
		}

		shopperProfile.fullName = Utils.updatePrimitiveField(
			shopperProfile.fullName,
			updateShopperProfileDto.fullName,
		);
		shopperProfile.bio = Utils.updatePrimitiveField(
			shopperProfile.bio,
			updateShopperProfileDto.bio,
		);
		shopperProfile.gender = Utils.updatePrimitiveField(
			shopperProfile.gender,
			updateShopperProfileDto.gender,
		);
		shopperProfile.dateOfBirth = Utils.updatePrimitiveField(
			shopperProfile.dateOfBirth,
			updateShopperProfileDto.dateOfBirth,
		);
		shopperProfile.instagramProfileLink = Utils.updatePrimitiveField(
			shopperProfile.instagramProfileLink,
			updateShopperProfileDto.instagramProfileLink,
		);
		shopperProfile.facebookProfileLink = Utils.updatePrimitiveField(
			shopperProfile.facebookProfileLink,
			updateShopperProfileDto.facebookProfileLink,
		);
		shopperProfile.tiktokProfileLink = Utils.updatePrimitiveField(
			shopperProfile.tiktokProfileLink,
			updateShopperProfileDto.tiktokProfileLink,
		);

		shopperProfile.preferences = Utils.updateMtMField(
			shopperProfile.preferences,
			updateShopperProfileDto.preferencesIds,
		);

		shopperProfile.profilePicture = {
			id: Utils.updatePrimitiveField(
				shopperProfile.profilePicture?.id,
				updateShopperProfileDto.mediaId,
			),
		} as MediaEntity;

		await this.dataSource.manager.save(ShopperProfileEntity, shopperProfile);
		return this.findOne({
			where: { id },
			relations: { addresses: true, preferences: true, profilePicture: true },
		});
	}

	_updateDefaultAddress(
		shopperProfile: ShopperProfileEntity,
		updateShopperProfileDto: UpdateShopperProfileDto,
	) {
		if (!shopperProfile.addresses) shopperProfile.addresses = [];
		const address = shopperProfile.addresses?.find((a) => a.isDefault);
		if (!address) {
			shopperProfile.addresses.push({
				country: updateShopperProfileDto.country,
				city: updateShopperProfileDto.city,
				apartment: updateShopperProfileDto.apartment,
				street: updateShopperProfileDto.street,
				isDefault: true,
			} as ShippingAddressEntity);
			return;
		}

		address.country = Utils.updatePrimitiveField(
			address.country,
			updateShopperProfileDto.country,
		);
		address.city = Utils.updatePrimitiveField(address.city, updateShopperProfileDto.city);
		address.apartment = Utils.updatePrimitiveField(
			address.apartment,
			updateShopperProfileDto.apartment,
		);
		address.street = Utils.updatePrimitiveField(
			address.street,
			updateShopperProfileDto.street,
		);
	}
}
