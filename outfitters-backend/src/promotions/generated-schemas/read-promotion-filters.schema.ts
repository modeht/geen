import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadNotificationFiltersSchema, {
	ReadNotificationFiltersSchemaFilters,
} from '../../notifications/generated-schemas/read-notification-filters.schema';
import ReadBrandProfileFiltersSchema, {
	ReadBrandProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile-filters.schema';
import ReadSeasonalPromotionFiltersSchema, {
	ReadSeasonalPromotionFiltersSchemaFilters,
} from './read-seasonal-promotion-filters.schema';
import ReadProductFiltersSchema, {
	ReadProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-filters.schema';
import ReadOrderItemFiltersSchema, {
	ReadOrderItemFiltersSchemaFilters,
} from '../../orders/generated-schemas/read-order-item-filters.schema';

import { PromotionTypeEnum } from '../entities/enums';
import { PromotionTargetEnum } from '../entities/enums';
import { PromotionStatusEnum } from '../entities/enums';
export class ReadPromotionFiltersSchemaFilters {
	title?: GenericComparable<'string'> | null;
	type?: PromotionTypeEnum | null;
	discountPercentage?: GenericComparable<'number'> | null;
	minPurchaseAmount?: GenericComparable<'number'> | null;
	start?: GenericComparable<'date'> | null;
	end?: GenericComparable<'date'> | null;
	target?: PromotionTargetEnum | null;
	status?: PromotionStatusEnum | null;
	notifications?: ReadNotificationFiltersSchemaFilters | null;
	brand?: ReadBrandProfileFiltersSchemaFilters | null;
	seasonalPromotion?: ReadSeasonalPromotionFiltersSchemaFilters | null;
	products?: ReadProductFiltersSchemaFilters | null;
	orderItems?: ReadOrderItemFiltersSchemaFilters | null;
	isDeleted?: GenericComparable<'bool'> | null;
	seasonalPromotionId?: GenericComparable<'number'> | null;
	brandId?: GenericComparable<'number'> | null;
}

const ReadPromotionFiltersSchema: v.GenericSchema<ReadPromotionFiltersSchemaFilters> = v.object({
	title: v.nullish(comparable('string')),
	type: v.nullish(v.enum(PromotionTypeEnum)),
	discountPercentage: v.nullish(comparable('number')),
	minPurchaseAmount: v.nullish(comparable('number')),
	start: v.nullish(comparable('date')),
	end: v.nullish(comparable('date')),
	target: v.nullish(v.enum(PromotionTargetEnum)),
	status: v.nullish(v.enum(PromotionStatusEnum)),
	notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
	brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	seasonalPromotion: v.nullish(v.lazy(() => ReadSeasonalPromotionFiltersSchema)),
	products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
	orderItems: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
	isDeleted: v.nullish(comparable('bool')),
	seasonalPromotionId: v.nullish(comparable('number')),
	brandId: v.nullish(comparable('number')),
});

export default ReadPromotionFiltersSchema;

export type TReadPromotionFiltersSchemaOutput = v.InferOutput<typeof ReadPromotionFiltersSchema>;
export type TReadPromotionFiltersSchemaInput = v.InferInput<typeof ReadPromotionFiltersSchema>;
