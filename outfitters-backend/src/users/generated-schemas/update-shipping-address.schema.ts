import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { OrderPaymentMethod } from '../../orders/entities/order.entity';
import { OrderPaymentStatusEnum } from '../../orders/entities/order.entity';
import { GenderEnum } from '../entities/shopper-profile.entity';
const UpdateShippingAddressSchema = v.pipe(
	v.object({
		deletedAt: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		isDefault: v.optional(v.boolean()),
		name: v.optional(v.string()),
		country: v.optional(v.string()),
		city: v.optional(v.string()),
		street: v.optional(v.string()),
		apartment: v.optional(v.string()),
		address: v.optional(v.string()),
		floor: v.optional(v.string()),
		building: v.optional(v.string()),
		latitude: v.optional(v.string()),
		longitude: v.optional(v.string()),
		orders: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
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
		shopperProfile: v.nullish(
			v.union([
				v.object({ id: v.number() }),
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
					isFollowing: v.nullish(v.boolean()),
					hasStory: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
					followingCount: v.nullish(v.number()),
					postsCount: v.nullish(v.number()),
					brandsCount: v.nullish(v.number()),
					engagementCount: v.nullish(v.number()),
				}),
			]),
		),
		shopperId: v.optional(v.number()),
	}),
	v.metadata({ [modelSymbol]: 'ShippingAddressEntity', orders: 'OrderEntity', shopperProfile: 'ShopperProfileEntity' }),
);
export default UpdateShippingAddressSchema;

export type TUpdateShippingAddressSchemaInput = v.InferInput<typeof UpdateShippingAddressSchema>;
export type TUpdateShippingAddressSchemaOutput = v.InferOutput<typeof UpdateShippingAddressSchema>;
