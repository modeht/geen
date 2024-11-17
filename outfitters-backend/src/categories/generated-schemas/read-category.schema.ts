import {
	GenericComparable,
	StringOperators,
	comparable,
} from '../../globals/lib/comparable';
import * as v from 'valibot';

export class ReadCategorySchemaFilters {
	name?: GenericComparable<'string'> | null | undefined;
	isArchived?: GenericComparable<'bool'> | null | undefined;
	superCategoryId?: GenericComparable<'number'> | null | undefined;
}

export const ReadCategorySchema: v.GenericSchema<ReadCategorySchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	isArchived: v.nullish(comparable('bool')),
	superCategoryId: v.nullish(comparable('number')),
});

export type TReadCategorySchema = v.InferOutput<typeof ReadCategorySchema>;

const d: TReadCategorySchema = {
	name: {
		operator: StringOperators.Contains,
		value: 'asd',
	},
};
