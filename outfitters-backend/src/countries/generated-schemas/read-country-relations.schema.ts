import * as v from 'valibot';
import {
	ReadMediaRelationsSchema,
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import {
	ReadBrandProfileRelationsSchema,
	ReadBrandProfileRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';

export class ReadCountryRelations {
	icon?: ReadMediaRelations | string | boolean | null | undefined;
	brands?: ReadBrandProfileRelations | boolean | null | undefined;
}

export const ReadCountryRelationsSchema: v.GenericSchema<ReadCountryRelations> = v.object(
	{
		icon: v.nullish(
			v.union([
				v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),
				),
				v.lazy(() => ReadMediaRelationsSchema),
			]),
		),
		brands: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)]),
		),
	},
);

export type TReadCountryRelationsSchemaOutput = v.InferOutput<
	typeof ReadCountryRelationsSchema
>;
export type TReadCountryRelationsSchemaInput = v.InferInput<
	typeof ReadCountryRelationsSchema
>;
