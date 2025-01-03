import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';

export class ReadCountryRelations {
	icon?: ReadMediaRelations | string | boolean;
}

const ReadCountryRelationsSchema: v.GenericSchema<ReadCountryRelations> = v.object({
	icon: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
});

export default ReadCountryRelationsSchema;

export type TReadCountryRelationsSchemaOutput = v.InferOutput<typeof ReadCountryRelationsSchema>;
export type TReadCountryRelationsSchemaInput = v.InferInput<typeof ReadCountryRelationsSchema>;
