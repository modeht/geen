import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';
import ReadOrder_itemsRelationsSchema, {
	ReadOrder_itemsRelations,
} from '../../order_items-feature/generated-schemas/read-order-_items-relations.schema';

export class ReadOrdersRelations {
	order_user?: ReadUsersRelations | string | boolean;
	order_order_items?: ReadOrder_itemsRelations | string | boolean;
}

const ReadOrdersRelationsSchema: v.GenericSchema<ReadOrdersRelations> = v.object({
	order_user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUsersRelationsSchema),
		]),
	),
	order_order_items: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrder_itemsRelationsSchema),
		]),
	),
});

export default ReadOrdersRelationsSchema;

export type TReadOrdersRelationsSchemaOutput = v.InferOutput<typeof ReadOrdersRelationsSchema>;
export type TReadOrdersRelationsSchemaInput = v.InferInput<typeof ReadOrdersRelationsSchema>;
