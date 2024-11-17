import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserSchema, ReadUserSchemaFilters } from './read-user.schema'
import { ReadMediaSchema, ReadMediaSchemaFilters } from '../../media/generated-schemas/read-media.schema'
import { ReadCollectionSchema, ReadCollectionSchemaFilters } from '../../collections/generated-schemas/read-collection.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'
import { ReadPromotionSchema, ReadPromotionSchemaFilters } from '../../promotions/generated-schemas/read-promotion.schema'
import { ReadPromoCodeSchema, ReadPromoCodeSchemaFilters } from '../../promotions/generated-schemas/read-promo-code.schema'
import { ReadBrandOrderSchema, ReadBrandOrderSchemaFilters } from '../../orders/generated-schemas/read-brand-order.schema'
import { ReadPreferenceSchema, ReadPreferenceSchemaFilters } from '../../preferences/generated-schemas/read-preference.schema'
import { ReadCollaborationSchema, ReadCollaborationSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration.schema'
import { ReadCategorySchema, ReadCategorySchemaFilters } from '../../categories/generated-schemas/read-category.schema'
import { ReadCountrySchema, ReadCountrySchemaFilters } from '../../countries/generated-schemas/read-country.schema'

export class ReadBrandProfileSchemaFilters {storeName?: GenericComparable<"string"> | null | undefined;
brandName?: GenericComparable<"string"> | null | undefined;
storeBio?: GenericComparable<"string"> | null | undefined;
website?: GenericComparable<"string"> | null | undefined;
isPublished?: GenericComparable<"bool"> | null | undefined;
shippingCost?: GenericComparable<"number"> | null | undefined;
currency?: GenericComparable<"string"> | null | undefined;
brandManagerFullName?: GenericComparable<"string"> | null | undefined;
user?: ReadUserSchemaFilters | null | undefined;
logo?: ReadMediaSchemaFilters | null | undefined;
cover?: ReadMediaSchemaFilters | null | undefined;
collections?: ReadCollectionSchemaFilters | null | undefined;
products?: ReadProductSchemaFilters | null | undefined;
promotions?: ReadPromotionSchemaFilters | null | undefined;
promoCodes?: ReadPromoCodeSchemaFilters | null | undefined;
brandOrders?: ReadBrandOrderSchemaFilters | null | undefined;
preferences?: ReadPreferenceSchemaFilters | null | undefined;
collaborations?: ReadCollaborationSchemaFilters | null | undefined;
categories?: ReadCategorySchemaFilters | null | undefined;
subCategories?: ReadCategorySchemaFilters | null | undefined;
countries?: ReadCountrySchemaFilters | null | undefined;
logoId?: GenericComparable<"number"> | null | undefined;
isFollowing?: GenericComparable<"bool"> | null | undefined;
hasStory?: GenericComparable<"bool"> | null | undefined;
followersCount?: GenericComparable<"number"> | null | undefined;
followingCount?: GenericComparable<"number"> | null | undefined;
postsCount?: GenericComparable<"number"> | null | undefined}

export const ReadBrandProfileSchema: v.GenericSchema<ReadBrandProfileSchemaFilters> = v.object({storeName: v.nullish(comparable("string")),
brandName: v.nullish(comparable("string")),
storeBio: v.nullish(comparable("string")),
website: v.nullish(comparable("string")),
isPublished: v.nullish(comparable("bool")),
shippingCost: v.nullish(comparable("number")),
currency: v.nullish(comparable("string")),
brandManagerFullName: v.nullish(comparable("string")),
user: v.nullish(v.lazy(() => ReadUserSchema)),
logo: v.nullish(v.lazy(() => ReadMediaSchema)),
cover: v.nullish(v.lazy(() => ReadMediaSchema)),
collections: v.nullish(v.lazy(() => ReadCollectionSchema)),
products: v.nullish(v.lazy(() => ReadProductSchema)),
promotions: v.nullish(v.lazy(() => ReadPromotionSchema)),
promoCodes: v.nullish(v.lazy(() => ReadPromoCodeSchema)),
brandOrders: v.nullish(v.lazy(() => ReadBrandOrderSchema)),
preferences: v.nullish(v.lazy(() => ReadPreferenceSchema)),
collaborations: v.nullish(v.lazy(() => ReadCollaborationSchema)),
categories: v.nullish(v.lazy(() => ReadCategorySchema)),
subCategories: v.nullish(v.lazy(() => ReadCategorySchema)),
countries: v.nullish(v.lazy(() => ReadCountrySchema)),
logoId: v.nullish(comparable("number")),
isFollowing: v.nullish(comparable("bool")),
hasStory: v.nullish(comparable("bool")),
followersCount: v.nullish(comparable("number")),
followingCount: v.nullish(comparable("number")),
postsCount: v.nullish(comparable("number"))})



export type TReadBrandProfileSchema = v.InferOutput<typeof ReadBrandProfileSchema>
export type TReadBrandProfileSchemaInput = v.InferInput<typeof ReadBrandProfileSchema>
