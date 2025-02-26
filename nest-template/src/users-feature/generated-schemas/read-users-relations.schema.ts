import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadProductsRelationsSchema, {
	ReadProductsRelations,
} from '../../products-feature/generated-schemas/read-products-relations.schema';
import ReadOrdersRelationsSchema, {
	ReadOrdersRelations,
} from '../../orders-feature/generated-schemas/read-orders-relations.schema';
import ReadReviewsRelationsSchema, {
	ReadReviewsRelations,
} from '../../reviews-feature/generated-schemas/read-reviews-relations.schema';
import ReadCart_itemsRelationsSchema, {
	ReadCart_itemsRelations,
} from '../../cart_items-feature/generated-schemas/read-cart-_items-relations.schema';

export class ReadUsersRelations {
	seller_products?: ReadProductsRelations | string | boolean;
	user_orders?: ReadOrdersRelations | string | boolean;
	user_reviews?: ReadReviewsRelations | string | boolean;
	user_cart_items?: ReadCart_itemsRelations | string | boolean;
}

const ReadUsersRelationsSchema: v.GenericSchema<ReadUsersRelations> = v.object({
	seller_products: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductsRelationsSchema),
		]),
	),
	user_orders: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrdersRelationsSchema),
		]),
	),
	user_reviews: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadReviewsRelationsSchema),
		]),
	),
	user_cart_items: v.optional(
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

export default ReadUsersRelationsSchema;

export type TReadUsersRelationsSchemaOutput = v.InferOutput<typeof ReadUsersRelationsSchema>;
export type TReadUsersRelationsSchemaInput = v.InferInput<typeof ReadUsersRelationsSchema>;
