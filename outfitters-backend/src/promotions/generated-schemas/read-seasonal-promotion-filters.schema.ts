import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadPromotionFiltersSchema, { ReadPromotionFiltersSchemaFilters } from './read-promotion-filters.schema';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';

import { PromotionStatusEnum } from '../entities/enums';
export class ReadSeasonalPromotionFiltersSchemaFilters {
	title?: GenericComparable<'string'> | null;
	start?: GenericComparable<'date'> | null;
	end?: GenericComparable<'date'> | null;
	status?: PromotionStatusEnum | null;
	promotions?: ReadPromotionFiltersSchemaFilters | null;
	subCategories?: ReadCategoryFiltersSchemaFilters | null;
}

const ReadSeasonalPromotionFiltersSchema: v.GenericSchema<ReadSeasonalPromotionFiltersSchemaFilters> = v.object({
	title: v.nullish(comparable('string')),
	start: v.nullish(comparable('date')),
	end: v.nullish(comparable('date')),
	status: v.nullish(v.enum(PromotionStatusEnum)),
	promotions: v.nullish(v.lazy(() => ReadPromotionFiltersSchema)),
	subCategories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
});

export default ReadSeasonalPromotionFiltersSchema;

export type TReadSeasonalPromotionFiltersSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionFiltersSchema>;
export type TReadSeasonalPromotionFiltersSchemaInput = v.InferInput<typeof ReadSeasonalPromotionFiltersSchema>;
