import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadBrandOrderFiltersSchema, { ReadBrandOrderFiltersSchemaFilters } from './read-brand-order-filters.schema';
import ReadProductVariantFiltersSchema, {
	ReadProductVariantFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-variant-filters.schema';
import ReadProductFiltersSchema, {
	ReadProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-filters.schema';
import ReadPromoCodeFiltersSchema, {
	ReadPromoCodeFiltersSchemaFilters,
} from '../../promotions/generated-schemas/read-promo-code-filters.schema';
import ReadPromotionFiltersSchema, {
	ReadPromotionFiltersSchemaFilters,
} from '../../promotions/generated-schemas/read-promotion-filters.schema';

export class ReadOrderItemFiltersSchemaFilters {
	quantity?: GenericComparable<'number'> | null;
	unitSalePrice?: GenericComparable<'number'> | null;
	unitPurchasePrice?: GenericComparable<'number'> | null;
	totalSalePrice?: GenericComparable<'number'> | null;
	totalPurchasePrice?: GenericComparable<'number'> | null;
	brandOrder?: ReadBrandOrderFiltersSchemaFilters | null;
	variant?: ReadProductVariantFiltersSchemaFilters | null;
	product?: ReadProductFiltersSchemaFilters | null;
	appliedPromoCode?: ReadPromoCodeFiltersSchemaFilters | null;
	appliedPromotions?: ReadPromotionFiltersSchemaFilters | null;
	brandOrderId?: GenericComparable<'number'> | null;
	productId?: GenericComparable<'number'> | null;
	variantId?: GenericComparable<'number'> | null;
	promoCodeId?: GenericComparable<'number'> | null;
}

const ReadOrderItemFiltersSchema: v.GenericSchema<ReadOrderItemFiltersSchemaFilters> = v.object({
	quantity: v.nullish(comparable('number')),
	unitSalePrice: v.nullish(comparable('number')),
	unitPurchasePrice: v.nullish(comparable('number')),
	totalSalePrice: v.nullish(comparable('number')),
	totalPurchasePrice: v.nullish(comparable('number')),
	brandOrder: v.nullish(v.lazy(() => ReadBrandOrderFiltersSchema)),
	variant: v.nullish(v.lazy(() => ReadProductVariantFiltersSchema)),
	product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
	appliedPromoCode: v.nullish(v.lazy(() => ReadPromoCodeFiltersSchema)),
	appliedPromotions: v.nullish(v.lazy(() => ReadPromotionFiltersSchema)),
	brandOrderId: v.nullish(comparable('number')),
	productId: v.nullish(comparable('number')),
	variantId: v.nullish(comparable('number')),
	promoCodeId: v.nullish(comparable('number')),
});

export default ReadOrderItemFiltersSchema;

export type TReadOrderItemFiltersSchemaOutput = v.InferOutput<typeof ReadOrderItemFiltersSchema>;
export type TReadOrderItemFiltersSchemaInput = v.InferInput<typeof ReadOrderItemFiltersSchema>;
