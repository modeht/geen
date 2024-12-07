import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadTaggedProductFiltersSchema, {
	ReadTaggedProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-tagged-product-filters.schema';
import ReadCartItemsFiltersSchema, {
	ReadCartItemsFiltersSchemaFilters,
} from '../../carts/generated-schemas/read-cart-items-filters.schema';
import ReadAffiliationLinkTrackingFiltersSchema, {
	ReadAffiliationLinkTrackingFiltersSchemaFilters,
} from './read-affiliation-link-tracking-filters.schema';
import ReadShopperProfileFiltersSchema, {
	ReadShopperProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-shopper-profile-filters.schema';
import ReadProductFiltersSchema, {
	ReadProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-product-filters.schema';

export class ReadAffiliationLinkFiltersSchemaFilters {
	isDisabled?: GenericComparable<'bool'> | null;
	url?: GenericComparable<'string'> | null;
	taggedProducts?: ReadTaggedProductFiltersSchemaFilters | null;
	cartItems?: ReadCartItemsFiltersSchemaFilters | null;
	affiliationLinkTracking?: ReadAffiliationLinkTrackingFiltersSchemaFilters | null;
	shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null;
	product?: ReadProductFiltersSchemaFilters | null;
	productId?: GenericComparable<'number'> | null;
	shopperId?: GenericComparable<'number'> | null;
}

const ReadAffiliationLinkFiltersSchema: v.GenericSchema<ReadAffiliationLinkFiltersSchemaFilters> = v.object({
	isDisabled: v.nullish(comparable('bool')),
	url: v.nullish(comparable('string')),
	taggedProducts: v.nullish(v.lazy(() => ReadTaggedProductFiltersSchema)),
	cartItems: v.nullish(v.lazy(() => ReadCartItemsFiltersSchema)),
	affiliationLinkTracking: v.nullish(v.lazy(() => ReadAffiliationLinkTrackingFiltersSchema)),
	shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
	product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
	productId: v.nullish(comparable('number')),
	shopperId: v.nullish(comparable('number')),
});

export default ReadAffiliationLinkFiltersSchema;

export type TReadAffiliationLinkFiltersSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkFiltersSchema>;
export type TReadAffiliationLinkFiltersSchemaInput = v.InferInput<typeof ReadAffiliationLinkFiltersSchema>;
