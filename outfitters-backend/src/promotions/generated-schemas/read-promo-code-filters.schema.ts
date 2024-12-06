import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadCartFiltersSchema, {
	ReadCartFiltersSchemaFilters,
} from '../../carts/generated-schemas/read-cart-filters.schema';
import ReadOrderItemFiltersSchema, {
	ReadOrderItemFiltersSchemaFilters,
} from '../../orders/generated-schemas/read-order-item-filters.schema';
import ReadBrandProfileFiltersSchema, {
	ReadBrandProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile-filters.schema';
import ReadShopperProfileFiltersSchema, {
	ReadShopperProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-shopper-profile-filters.schema';
import ReadProductFiltersSchema, {
	ReadProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-filters.schema';

import { PromotionTypeEnum } from '../entities/enums';
import { PromotionStatusEnum } from '../entities/enums';
export class ReadPromoCodeFiltersSchemaFilters {
	deletedAt?: GenericComparable<'date'> | null;
	code?: GenericComparable<'string'> | null;
	title?: GenericComparable<'string'> | null;
	minPurchaseAmount?: GenericComparable<'number'> | null;
	perUserLimit?: GenericComparable<'number'> | null;
	totalLimit?: GenericComparable<'number'> | null;
	start?: GenericComparable<'date'> | null;
	end?: GenericComparable<'date'> | null;
	discountPercentage?: GenericComparable<'number'> | null;
	type?: PromotionTypeEnum | null;
	status?: PromotionStatusEnum | null;
	carts?: ReadCartFiltersSchemaFilters | null;
	orderItems?: ReadOrderItemFiltersSchemaFilters | null;
	brand?: ReadBrandProfileFiltersSchemaFilters | null;
	shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null;
	products?: ReadProductFiltersSchemaFilters | null;
	brandId?: GenericComparable<'number'> | null;
	shopperId?: GenericComparable<'number'> | null;
	ussageCount?: GenericComparable<'number'> | null;
	totalMoneyDeducted?: GenericComparable<'number'> | null;
}

const ReadPromoCodeFiltersSchema: v.GenericSchema<ReadPromoCodeFiltersSchemaFilters> = v.object({
	deletedAt: v.nullish(comparable('date')),
	code: v.nullish(comparable('string')),
	title: v.nullish(comparable('string')),
	minPurchaseAmount: v.nullish(comparable('number')),
	perUserLimit: v.nullish(comparable('number')),
	totalLimit: v.nullish(comparable('number')),
	start: v.nullish(comparable('date')),
	end: v.nullish(comparable('date')),
	discountPercentage: v.nullish(comparable('number')),
	type: v.nullish(v.enum(PromotionTypeEnum)),
	status: v.nullish(v.enum(PromotionStatusEnum)),
	carts: v.nullish(v.lazy(() => ReadCartFiltersSchema)),
	orderItems: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
	brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
	products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
	brandId: v.nullish(comparable('number')),
	shopperId: v.nullish(comparable('number')),
	ussageCount: v.nullish(comparable('number')),
	totalMoneyDeducted: v.nullish(comparable('number')),
});

export default ReadPromoCodeFiltersSchema;

export type TReadPromoCodeFiltersSchemaOutput = v.InferOutput<typeof ReadPromoCodeFiltersSchema>;
export type TReadPromoCodeFiltersSchemaInput = v.InferInput<typeof ReadPromoCodeFiltersSchema>;
