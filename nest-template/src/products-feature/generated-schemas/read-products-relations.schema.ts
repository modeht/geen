import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadSellersRelationsSchema, {
	ReadSellersRelations,
} from '../../sellers-feature/generated-schemas/read-sellers-relations.schema';

export class ReadProductsRelations {
	seller_id?: ReadSellersRelations | string | boolean;
}

const ReadProductsRelationsSchema: v.GenericSchema<ReadProductsRelations> = v.object({
	seller_id: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadSellersRelationsSchema),
		]),
	),
});

export default ReadProductsRelationsSchema;

export type TReadProductsRelationsSchemaOutput = v.InferOutput<typeof ReadProductsRelationsSchema>;
export type TReadProductsRelationsSchemaInput = v.InferInput<typeof ReadProductsRelationsSchema>;
