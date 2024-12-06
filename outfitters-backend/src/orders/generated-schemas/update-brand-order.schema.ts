import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { OrderPaymentMethod } from '../entities/order.entity';
import { OrderPaymentStatusEnum } from '../entities/order.entity';
const UpdateBrandOrderSchema = v.pipe(
	v.object({
		status: v.optional(v.enum(OrderStatusEnum)),
		totalSalePrice: v.nullish(v.number()),
		totalPurchasePrice: v.nullish(v.number()),
		shippingFees: v.nullish(v.number()),
		rating: v.nullish(v.number()),
		review: v.nullish(v.string()),
		expectedDeliveryDate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		acceptedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		shippedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		deliveredAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		cancelledAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		items: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						quantity: v.nullish(v.number()),
						unitSalePrice: v.nullish(v.number()),
						unitPurchasePrice: v.nullish(v.number()),
						totalSalePrice: v.nullish(v.number()),
						totalPurchasePrice: v.nullish(v.number()),
						brandOrderId: v.number(),
						productId: v.number(),
						variantId: v.number(),
						promoCodeId: v.number(),
					}),
				),
			]),
		),
		brand: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					storeName: v.nullish(v.string()),
					brandName: v.nullish(v.string()),
					storeBio: v.nullish(v.string()),
					website: v.nullish(v.string()),
					isPublished: v.boolean(),
					shippingCost: v.nullish(v.number()),
					currency: v.nullish(v.string()),
					brandManagerFullName: v.nullish(v.string()),
					logoId: v.nullish(v.number()),
					isFollowing: v.nullish(v.boolean()),
					hasStory: v.nullish(v.boolean()),
					followersCount: v.nullish(v.number()),
					followingCount: v.nullish(v.number()),
					postsCount: v.nullish(v.number()),
				}),
			]),
		),
		order: v.nullish(
			v.union([
				v.object({ id: v.number() }),
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
			]),
		),
		orderId: v.optional(v.number()),
		brandId: v.optional(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'BrandOrderEntity',
		items: 'OrderItemEntity',
		brand: 'BrandProfileEntity',
		order: 'OrderEntity',
	}),
);
export default UpdateBrandOrderSchema;

export type TUpdateBrandOrderSchemaInput = v.InferInput<typeof UpdateBrandOrderSchema>;
export type TUpdateBrandOrderSchemaOutput = v.InferOutput<typeof UpdateBrandOrderSchema>;
