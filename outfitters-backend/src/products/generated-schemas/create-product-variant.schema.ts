import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

const CreateProductVariantSchema = v.pipe(
	v.object({
		isArchived: v.boolean(),
		stock: v.number(),
		price: v.nullish(v.number()),
		lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		sku: v.nullish(v.string()),
		media: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						mimetype: v.nullish(v.string()),
						url: v.nullish(v.string()),
						size: v.nullish(v.number()),
						width: v.nullish(v.number()),
						height: v.nullish(v.number()),
					}),
				),
			]),
		),
		orderItems: v.nullish(
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
		carts: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						quantity: v.nullish(v.number()),
						cartId: v.number(),
						productId: v.number(),
						variantId: v.number(),
						affiliationLinkId: v.number(),
						totalPrice: v.number(),
						totalDiscountedPrice: v.number(),
						promoCodeApplied: v.boolean(),
						appliedpromotionsIds: v.array(v.number()),
					}),
				),
			]),
		),
		mainProduct: v.nullish(
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
		optionValues: v.nullish(
			v.union([v.array(v.object({ value: v.string(), optionName: v.string(), productId: v.number() }))]),
		),
		mainProductId: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'ProductVariantEntity',
		media: 'MediaEntity',
		orderItems: 'OrderItemEntity',
		carts: 'CartItemsEntity',
		mainProduct: 'ProductEntity',
		optionValues: 'ProductOptionValueEntity',
	}),
);
export default CreateProductVariantSchema;

export type TCreateProductVariantSchemaInput = v.InferInput<typeof CreateProductVariantSchema>;
export type TCreateProductVariantSchemaOutput = v.InferOutput<typeof CreateProductVariantSchema>;
