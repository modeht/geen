import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { GenderEnum } from '../entities/shopper-profile.entity';
import { AccountStatus } from '../entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
import { CartStatus } from '../../carts/entities/cart.entity';
import { OrderPaymentMethod } from '../../orders/entities/order.entity';
import { OrderPaymentStatusEnum } from '../../orders/entities/order.entity';
import { CollaborationStatusEnum } from '../../collaborations/entities/collaboration.entity';
import { PromotionTypeEnum } from '../../promotions/entities/enums';
import { PromotionStatusEnum } from '../../promotions/entities/enums';
const CreateShopperProfileSchema = v.pipe(
	v.object({
		username: v.nullish(v.string()),
		fullName: v.nullish(v.string()),
		dateOfBirth: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
		bio: v.string(),
		gender: v.nullish(v.enum(GenderEnum)),
		onboardingStep: v.nullish(v.number()),
		facebookProfileLink: v.nullish(v.string()),
		instagramProfileLink: v.string(),
		tiktokProfileLink: v.string(),
		isOutfitter: v.boolean(),
		user: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					status: v.enum(AccountStatus),
					email: v.nullish(v.string()),
					phone: v.nullish(v.string()),
					password: v.nullish(v.string()),
					firebaseId: v.nullish(v.string()),
					emailVerified: v.nullish(v.boolean()),
					isGoogleSignin: v.nullish(v.boolean()),
					isAppleSignin: v.nullish(v.boolean()),
					defaultLang: v.enum(LanguageEnum),
					isFollowing: v.nullish(v.boolean()),
					isBlockedBy: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
				}),
			]),
		),
		reviews: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						stars: v.nullish(v.number()),
						comment: v.nullish(v.string()),
						productId: v.number(),
						shopperId: v.number(),
					}),
				),
			]),
		),
		addresses: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						isDefault: v.boolean(),
						name: v.string(),
						country: v.string(),
						city: v.string(),
						street: v.string(),
						apartment: v.string(),
						address: v.string(),
						floor: v.string(),
						building: v.string(),
						latitude: v.string(),
						longitude: v.string(),
						shopperId: v.number(),
					}),
				),
			]),
		),
		profilePicture: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					mimetype: v.nullish(v.string()),
					url: v.nullish(v.string()),
					size: v.nullish(v.number()),
					width: v.nullish(v.number()),
					height: v.nullish(v.number()),
				}),
			]),
		),
		carts: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						status: v.enum(CartStatus),
						promoCodeId: v.nullish(v.number()),
						shopperId: v.nullish(v.number()),
					}),
				),
			]),
		),
		orders: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						transactions: v.nullish(v.any()),
						paymentMethod: v.enum(OrderPaymentMethod),
						paymentStatus: v.nullish(v.enum(OrderPaymentStatusEnum)),
						totalSalePrice: v.nullish(v.number()),
						totalPurchasePrice: v.nullish(v.number()),
						totalShippingFees: v.nullish(v.number()),
						cartId: v.number(),
						shippingAddressId: v.number(),
						shopperId: v.number(),
					}),
				),
			]),
		),
		preferences: v.nullish(
			v.union([v.array(v.object({ name: v.nullish(v.string()), mediaId: v.nullish(v.number()) }))]),
		),
		collaborations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						status: v.enum(CollaborationStatusEnum),
						brandId: v.nullish(v.number()),
						shopperId: v.nullish(v.number()),
					}),
				),
			]),
		),
		affiliationLinks: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						test: v.any(),
						isDisabled: v.boolean(),
						url: v.string(),
						productId: v.number(),
						shopperId: v.number(),
					}),
				),
			]),
		),
		promoCodes: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						code: v.string(),
						title: v.string(),
						minPurchaseAmount: v.nullish(v.number()),
						perUserLimit: v.nullish(v.number()),
						totalLimit: v.nullish(v.number()),
						start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						discountPercentage: v.number(),
						type: v.enum(PromotionTypeEnum),
						status: v.enum(PromotionStatusEnum),
						brandId: v.number(),
						shopperId: v.number(),
						ussageCount: v.number(),
						totalMoneyDeducted: v.number(),
					}),
				),
			]),
		),
		isFollowing: v.nullish(v.boolean()),
		hasStory: v.nullish(v.boolean()),
		followersCount: v.nullish(v.number()),
		followingCount: v.nullish(v.number()),
		postsCount: v.nullish(v.number()),
		brandsCount: v.nullish(v.number()),
		engagementCount: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'ShopperProfileEntity',
		user: 'UserEntity',
		reviews: 'ProductReviewEntity',
		addresses: 'ShippingAddressEntity',
		profilePicture: 'MediaEntity',
		carts: 'CartEntity',
		orders: 'OrderEntity',
		preferences: 'PreferenceEntity',
		collaborations: 'CollaborationEntity',
		affiliationLinks: 'AffiliationLinkEntity',
		promoCodes: 'PromoCodeEntity',
	}),
);
export default CreateShopperProfileSchema;

export type TCreateShopperProfileSchemaInput = v.InferInput<typeof CreateShopperProfileSchema>;
export type TCreateShopperProfileSchemaOutput = v.InferOutput<typeof CreateShopperProfileSchema>;
