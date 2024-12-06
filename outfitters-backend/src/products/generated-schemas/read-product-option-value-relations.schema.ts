import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadProductOptionRelationsSchema, { ReadProductOptionRelations } from './read-product-option-relations.schema';
import ReadProductVariantRelationsSchema, {
	ReadProductVariantRelations,
} from './read-product-variant-relations.schema';

export class ReadProductOptionValueRelations {
	option?: ReadProductOptionRelations | string | boolean;
	variants?: ReadProductVariantRelations | string | boolean;
}

const ReadProductOptionValueRelationsSchema: v.GenericSchema<ReadProductOptionValueRelations> = v.object({
	option: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductOptionRelationsSchema),
		]),
	),
	variants: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductVariantRelationsSchema),
		]),
	),
});

export default ReadProductOptionValueRelationsSchema;

export type TReadProductOptionValueRelationsSchemaOutput = v.InferOutput<typeof ReadProductOptionValueRelationsSchema>;
export type TReadProductOptionValueRelationsSchemaInput = v.InferInput<typeof ReadProductOptionValueRelationsSchema>;
