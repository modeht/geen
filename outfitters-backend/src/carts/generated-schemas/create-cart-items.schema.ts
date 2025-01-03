import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

import { CartStatus } from '../entities/cart.entity';
const CreateCartItemsSchema = v.pipe(
	v.object({
		quantity: v.nullish(v.number()),
		cart: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({ status: v.enum(CartStatus), promoCodeId: v.nullish(v.number()), shopperId: v.nullish(v.number()) }),
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
		affiliationLink: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
					test: v.any(),
					isDisabled: v.boolean(),
					url: v.string(),
					productId: v.number(),
					shopperId: v.number(),
				}),
			]),
		),
		cartId: v.number(),
		productId: v.number(),
		variantId: v.number(),
		affiliationLinkId: v.number(),
		totalPrice: v.number(),
		totalDiscountedPrice: v.number(),
		promoCodeApplied: v.boolean(),
		appliedpromotionsIds: v.array(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'CartItemsEntity',
		cart: 'CartEntity',
		product: 'ProductEntity',
		variant: 'ProductVariantEntity',
		affiliationLink: 'AffiliationLinkEntity',
	}),
);
export default CreateCartItemsSchema;

export type TCreateCartItemsSchemaInput = v.InferInput<typeof CreateCartItemsSchema>;
export type TCreateCartItemsSchemaOutput = v.InferOutput<typeof CreateCartItemsSchema>;
