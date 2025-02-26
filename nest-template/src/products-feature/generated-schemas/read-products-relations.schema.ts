import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';
import ReadOrder_itemsRelationsSchema, {
	ReadOrder_itemsRelations,
} from '../../order_items-feature/generated-schemas/read-order-_items-relations.schema';
import ReadReviewsRelationsSchema, {
	ReadReviewsRelations,
} from '../../reviews-feature/generated-schemas/read-reviews-relations.schema';
import ReadCart_itemsRelationsSchema, {
	ReadCart_itemsRelations,
} from '../../cart_items-feature/generated-schemas/read-cart-_items-relations.schema';

export class ReadProductsRelations {
	product_seller?: ReadUsersRelations | string | boolean;
	product_order_items?: ReadOrder_itemsRelations | string | boolean;
	product_reviews?: ReadReviewsRelations | string | boolean;
	product_cart_items?: ReadCart_itemsRelations | string | boolean;
}

const ReadProductsRelationsSchema: v.GenericSchema<ReadProductsRelations> = v.object({
	product_seller: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUsersRelationsSchema),
		]),
	),
	product_order_items: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrder_itemsRelationsSchema),
		]),
	),
	product_reviews: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadReviewsRelationsSchema),
		]),
	),
	product_cart_items: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCart_itemsRelationsSchema),
		]),
	),
});

export default ReadProductsRelationsSchema;

export type TReadProductsRelationsSchemaOutput = v.InferOutput<typeof ReadProductsRelationsSchema>;
export type TReadProductsRelationsSchemaInput = v.InferInput<typeof ReadProductsRelationsSchema>;
