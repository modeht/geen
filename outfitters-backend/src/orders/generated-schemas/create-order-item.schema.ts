import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { PromotionTypeEnum } from '../../promotions/entities/enums';
import { PromotionStatusEnum } from '../../promotions/entities/enums';
import { PromotionTargetEnum } from '../../promotions/entities/enums';
const CreateOrderItemSchema = v.pipe(
	v.object({
		quantity: v.nullish(v.number()),
		unitSalePrice: v.nullish(v.number()),
		unitPurchasePrice: v.nullish(v.number()),
		totalSalePrice: v.nullish(v.number()),
		totalPurchasePrice: v.nullish(v.number()),
		brandOrder: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					status: v.enum(OrderStatusEnum),
					totalSalePrice: v.nullish(v.number()),
					totalPurchasePrice: v.nullish(v.number()),
					shippingFees: v.nullish(v.number()),
					rating: v.nullish(v.number()),
					review: v.nullish(v.string()),
					expectedDeliveryDate: v.nullish(
						v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
					),
					acceptedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					shippedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					deliveredAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					cancelledAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					orderId: v.number(),
					brandId: v.number(),
				}),
			]),
		),
		variant: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					isArchived: v.boolean(),
					stock: v.number(),
					price: v.nullish(v.number()),
					lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					sku: v.nullish(v.string()),
					mainProductId: v.nullish(v.number()),
				}),
			]),
		),
		product: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					isArchived: v.boolean(),
					title: v.nullish(v.string()),
					description: v.nullish(v.string()),
					basePrice: v.nullish(v.number()),
					sku: v.nullish(v.string()),
					currency: v.nullish(v.string()),
					stock: v.number(),
					lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					isOutOfStock: v.boolean(),
					isFeatured: v.boolean(),
					deliveryEstimationInDays: v.number(),
					brandId: v.nullish(v.number()),
					categoryId: v.nullish(v.number()),
					subCategoryId: v.nullish(v.number()),
					averageRating: v.number(),
					isSaved: v.boolean(),
				}),
			]),
		),
		appliedPromoCode: v.nullish(
			v.union([
				v.object({ id: v.number() }),
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
			]),
		),
		appliedPromotions: v.nullish(
			v.union([
				v.array(
					v.object({
						title: v.string(),
						type: v.enum(PromotionTypeEnum),
						discountPercentage: v.number(),
						minPurchaseAmount: v.nullish(v.number()),
						start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
						target: v.enum(PromotionTargetEnum),
						status: v.enum(PromotionStatusEnum),
						isDeleted: v.boolean(),
						seasonalPromotionId: v.nullish(v.number()),
						brandId: v.number(),
					}),
				),
			]),
		),
		brandOrderId: v.number(),
		productId: v.number(),
		variantId: v.number(),
		promoCodeId: v.number(),
	}),
	v.metadata({
		[modelSymbol]: 'OrderItemEntity',
		brandOrder: 'BrandOrderEntity',
		variant: 'ProductVariantEntity',
		product: 'ProductEntity',
		appliedPromoCode: 'PromoCodeEntity',
		appliedPromotions: 'PromotionEntity',
	}),
);
export default CreateOrderItemSchema;

export type TCreateOrderItemSchemaInput = v.InferInput<typeof CreateOrderItemSchema>;
export type TCreateOrderItemSchemaOutput = v.InferOutput<typeof CreateOrderItemSchema>;
