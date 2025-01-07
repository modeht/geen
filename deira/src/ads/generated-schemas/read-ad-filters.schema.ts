import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { PaymentStatusEnum } from '../entities/ad.entity';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';
import ReadGovernorateFiltersSchema, {
	ReadGovernorateFiltersSchemaFilters,
} from '../../governorate/generated-schemas/read-governorate-filters.schema';
import ReadPlanFiltersSchema, {
	ReadPlanFiltersSchemaFilters,
} from '../../plans/generated-schemas/read-plan-filters.schema';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadCategoryFiltersSchema, {
	ReadCategoryFiltersSchemaFilters,
} from '../../categories/generated-schemas/read-category-filters.schema';
import ReadCategoryFilterFiltersSchema, {
	ReadCategoryFilterFiltersSchemaFilters,
} from '../../category-fitlers/generated-schemas/read-category-filter-filters.schema';
import ReadFavoriteFiltersSchema, {
	ReadFavoriteFiltersSchemaFilters,
} from '../../favorites/generated-schemas/read-favorite-filters.schema';

export class ReadAdFiltersSchemaFilters {
	user?: ReadUserFiltersSchemaFilters | null;
	messages?: ReadMessageFiltersSchemaFilters | null;
	governorates?: ReadGovernorateFiltersSchemaFilters | null;
	plan?: ReadPlanFiltersSchemaFilters | null;
	start?: GenericComparable<'date'> | null;
	end?: GenericComparable<'date'> | null;
	media?: ReadMediaFiltersSchemaFilters | null;
	categories?: ReadCategoryFiltersSchemaFilters | null;
	filters?: ReadCategoryFilterFiltersSchemaFilters | null;
	price?: GenericComparable<'number'> | null;
	enableWhatsapp?: GenericComparable<'bool'> | null;
	enablePhone?: GenericComparable<'bool'> | null;
	paymentStatus?: PaymentStatusEnum | null;
	title?: GenericComparable<'string'> | null;
	description?: GenericComparable<'string'> | null;
	fans?: ReadFavoriteFiltersSchemaFilters | null;
	isBlocked?: GenericComparable<'bool'> | null;
	viewsCount?: GenericComparable<'number'> | null;
}

const ReadAdFiltersSchema: v.GenericSchema<ReadAdFiltersSchemaFilters> = v.object({
	user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	messages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	governorates: v.nullish(v.lazy(() => ReadGovernorateFiltersSchema)),
	plan: v.nullish(v.lazy(() => ReadPlanFiltersSchema)),
	start: v.nullish(comparable('date')),
	end: v.nullish(comparable('date')),
	media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	categories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
	filters: v.nullish(v.lazy(() => ReadCategoryFilterFiltersSchema)),
	price: v.nullish(comparable('number')),
	enableWhatsapp: v.nullish(comparable('bool')),
	enablePhone: v.nullish(comparable('bool')),
	paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
	title: v.nullish(comparable('string')),
	description: v.nullish(comparable('string')),
	fans: v.nullish(v.lazy(() => ReadFavoriteFiltersSchema)),
	isBlocked: v.nullish(comparable('bool')),
	viewsCount: v.nullish(comparable('number')),
});

export default ReadAdFiltersSchema;

export type TReadAdFiltersSchemaOutput = v.InferOutput<typeof ReadAdFiltersSchema>;
export type TReadAdFiltersSchemaInput = v.InferInput<typeof ReadAdFiltersSchema>;
