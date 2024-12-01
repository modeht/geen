import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadUserFiltersSchema, { ReadUserFiltersSchemaFilters } from './read-user-filters.schema'
import ReadMediaFiltersSchema, { ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import ReadCollectionFiltersSchema, { ReadCollectionFiltersSchemaFilters } from '../../collections/generated-schemas/read-collection-filters.schema'
import ReadProductFiltersSchema, { ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import ReadPromotionFiltersSchema, { ReadPromotionFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promotion-filters.schema'
import ReadPromoCodeFiltersSchema, { ReadPromoCodeFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promo-code-filters.schema'
import ReadBrandOrderFiltersSchema, { ReadBrandOrderFiltersSchemaFilters } from '../../orders/generated-schemas/read-brand-order-filters.schema'
import ReadPreferenceFiltersSchema, { ReadPreferenceFiltersSchemaFilters } from '../../preferences/generated-schemas/read-preference-filters.schema'
import ReadCollaborationFiltersSchema, { ReadCollaborationFiltersSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration-filters.schema'
import ReadCategoryFiltersSchema, { ReadCategoryFiltersSchemaFilters } from '../../categories/generated-schemas/read-category-filters.schema'
import ReadCountryFiltersSchema, { ReadCountryFiltersSchemaFilters } from '../../countries/generated-schemas/read-country-filters.schema'



export class ReadBrandProfileFiltersSchemaFilters {storeName?: GenericComparable<"string"> | null;
brandName?: GenericComparable<"string"> | null;
storeBio?: GenericComparable<"string"> | null;
website?: GenericComparable<"string"> | null;
isPublished?: GenericComparable<"bool"> | null;
shippingCost?: GenericComparable<"number"> | null;
currency?: GenericComparable<"string"> | null;
brandManagerFullName?: GenericComparable<"string"> | null;
user?: ReadUserFiltersSchemaFilters | null;
logo?: ReadMediaFiltersSchemaFilters | null;
cover?: ReadMediaFiltersSchemaFilters | null;
collections?: ReadCollectionFiltersSchemaFilters | null;
products?: ReadProductFiltersSchemaFilters | null;
promotions?: ReadPromotionFiltersSchemaFilters | null;
promoCodes?: ReadPromoCodeFiltersSchemaFilters | null;
brandOrders?: ReadBrandOrderFiltersSchemaFilters | null;
preferences?: ReadPreferenceFiltersSchemaFilters | null;
collaborations?: ReadCollaborationFiltersSchemaFilters | null;
categories?: ReadCategoryFiltersSchemaFilters | null;
subCategories?: ReadCategoryFiltersSchemaFilters | null;
countries?: ReadCountryFiltersSchemaFilters | null;
logoId?: GenericComparable<"number"> | null;
isFollowing?: GenericComparable<"bool"> | null;
hasStory?: GenericComparable<"bool"> | null;
followersCount?: GenericComparable<"number"> | null;
followingCount?: GenericComparable<"number"> | null;
postsCount?: GenericComparable<"number"> | null}

const ReadBrandProfileFiltersSchema: v.GenericSchema<ReadBrandProfileFiltersSchemaFilters> = v.object({storeName: v.nullish(comparable("string")),
brandName: v.nullish(comparable("string")),
storeBio: v.nullish(comparable("string")),
website: v.nullish(comparable("string")),
isPublished: v.nullish(comparable("bool")),
shippingCost: v.nullish(comparable("number")),
currency: v.nullish(comparable("string")),
brandManagerFullName: v.nullish(comparable("string")),
user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
logo: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
cover: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
collections: v.nullish(v.lazy(() => ReadCollectionFiltersSchema)),
products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
promotions: v.nullish(v.lazy(() => ReadPromotionFiltersSchema)),
promoCodes: v.nullish(v.lazy(() => ReadPromoCodeFiltersSchema)),
brandOrders: v.nullish(v.lazy(() => ReadBrandOrderFiltersSchema)),
preferences: v.nullish(v.lazy(() => ReadPreferenceFiltersSchema)),
collaborations: v.nullish(v.lazy(() => ReadCollaborationFiltersSchema)),
categories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
subCategories: v.nullish(v.lazy(() => ReadCategoryFiltersSchema)),
countries: v.nullish(v.lazy(() => ReadCountryFiltersSchema)),
logoId: v.nullish(comparable("number")),
isFollowing: v.nullish(comparable("bool")),
hasStory: v.nullish(comparable("bool")),
followersCount: v.nullish(comparable("number")),
followingCount: v.nullish(comparable("number")),
postsCount: v.nullish(comparable("number"))});

export default ReadBrandProfileFiltersSchema;




export type TReadBrandProfileFiltersSchemaOutput = v.InferOutput<typeof ReadBrandProfileFiltersSchema>;
export type TReadBrandProfileFiltersSchemaInput = v.InferInput<typeof ReadBrandProfileFiltersSchema>;
