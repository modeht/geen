import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';
import ReadProductsRelationsSchema, {
	ReadProductsRelations,
} from '../../products-feature/generated-schemas/read-products-relations.schema';

export class ReadCart_itemsRelations {
	cart_item_user?: ReadUsersRelations | string | boolean;
	cart_item_product?: ReadProductsRelations | string | boolean;
}

const ReadCart_itemsRelationsSchema: v.GenericSchema<ReadCart_itemsRelations> = v.object({
	cart_item_user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUsersRelationsSchema),
		]),
	),
	cart_item_product: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductsRelationsSchema),
		]),
	),
});

export default ReadCart_itemsRelationsSchema;

export type TReadCart_itemsRelationsSchemaOutput = v.InferOutput<typeof ReadCart_itemsRelationsSchema>;
export type TReadCart_itemsRelationsSchemaInput = v.InferInput<typeof ReadCart_itemsRelationsSchema>;
