import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';

export class ReadStaticFiltersSchemaFilters {
	whatsapp?: GenericComparable<'string'> | null;
	email?: GenericComparable<'string'> | null;
	phoneNumber?: GenericComparable<'string'> | null;
	facebook?: GenericComparable<'string'> | null;
	instagram?: GenericComparable<'string'> | null;
	x?: GenericComparable<'string'> | null;
}

const ReadStaticFiltersSchema: v.GenericSchema<ReadStaticFiltersSchemaFilters> = v.object({
	whatsapp: v.nullish(comparable('string')),
	email: v.nullish(comparable('string')),
	phoneNumber: v.nullish(comparable('string')),
	facebook: v.nullish(comparable('string')),
	instagram: v.nullish(comparable('string')),
	x: v.nullish(comparable('string')),
});

export default ReadStaticFiltersSchema;

export type TReadStaticFiltersSchemaOutput = v.InferOutput<typeof ReadStaticFiltersSchema>;
export type TReadStaticFiltersSchemaInput = v.InferInput<typeof ReadStaticFiltersSchema>;
