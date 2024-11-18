import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import {
	ReadMediaSchema,
	ReadMediaSchemaFilters,
} from '../../media/generated-schemas/read-media.schema';
import {
	ReadProductSchema,
	ReadProductSchemaFilters,
} from '../../products/generated-schemas/read-product.schema';
import {
	ReadBrandProfileSchema,
	ReadBrandProfileSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile.schema';
import {
	ReadSeasonalPromotionSchema,
	ReadSeasonalPromotionSchemaFilters,
} from '../../promotions/generated-schemas/read-seasonal-promotion.schema';

export class ReadCategorySchemaFilters {
	name?: GenericComparable<'string'> | null | undefined;
	isArchived?: GenericComparable<'bool'> | null | undefined;
	media?: ReadMediaSchemaFilters | null | undefined;
	subCategories?: ReadCategorySchemaFilters | null | undefined;
	superCategory?: ReadCategorySchemaFilters | null | undefined;
	superCategoryId?: GenericComparable<'number'> | null | undefined;
	products?: ReadProductSchemaFilters | null | undefined;
	categorybrandProfiles?: ReadBrandProfileSchemaFilters | null | undefined;
	subCategoriesBrandProfiles?: ReadBrandProfileSchemaFilters | null | undefined;
	seasonalPromotions?: ReadSeasonalPromotionSchemaFilters | null | undefined;
}

export const ReadCategorySchema: v.GenericSchema<ReadCategorySchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	isArchived: v.nullish(comparable('bool')),
	media: v.nullish(v.lazy(() => ReadMediaSchema)),
	subCategories: v.nullish(v.lazy(() => ReadCategorySchema)),
	superCategory: v.nullish(v.lazy(() => ReadCategorySchema)),
	superCategoryId: v.nullish(comparable('number')),
	products: v.nullish(v.lazy(() => ReadProductSchema)),
	categorybrandProfiles: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
	subCategoriesBrandProfiles: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
	seasonalPromotions: v.nullish(v.lazy(() => ReadSeasonalPromotionSchema)),
});

export type TReadCategorySchema = v.InferOutput<typeof ReadCategorySchema>;
export type TReadCategorySchemaInput = v.InferInput<typeof ReadCategorySchema>;
