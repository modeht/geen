import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadOrdersRelationsSchema, {
	ReadOrdersRelations,
} from '../../orders-feature/generated-schemas/read-orders-relations.schema';
import ReadProductsRelationsSchema, {
	ReadProductsRelations,
} from '../../products-feature/generated-schemas/read-products-relations.schema';

export class ReadOrder_itemsRelations {
	order_id?: ReadOrdersRelations | string | boolean;
	product_id?: ReadProductsRelations | string | boolean;
}

const ReadOrder_itemsRelationsSchema: v.GenericSchema<ReadOrder_itemsRelations> = v.object({
	order_id: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrdersRelationsSchema),
		]),
	),
	product_id: v.optional(
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

export default ReadOrder_itemsRelationsSchema;

export type TReadOrder_itemsRelationsSchemaOutput = v.InferOutput<typeof ReadOrder_itemsRelationsSchema>;
export type TReadOrder_itemsRelationsSchemaInput = v.InferInput<typeof ReadOrder_itemsRelationsSchema>;
