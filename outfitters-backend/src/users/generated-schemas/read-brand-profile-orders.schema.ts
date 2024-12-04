import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadUserOrdersSchema, { ReadUserOrders } from './read-user-orders.schema'
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import ReadCollectionOrdersSchema, { ReadCollectionOrders } from '../../collections/generated-schemas/read-collection-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import ReadPromotionOrdersSchema, { ReadPromotionOrders } from '../../promotions/generated-schemas/read-promotion-orders.schema'
import ReadPromoCodeOrdersSchema, { ReadPromoCodeOrders } from '../../promotions/generated-schemas/read-promo-code-orders.schema'
import ReadBrandOrderOrdersSchema, { ReadBrandOrderOrders } from '../../orders/generated-schemas/read-brand-order-orders.schema'
import ReadPreferenceOrdersSchema, { ReadPreferenceOrders } from '../../preferences/generated-schemas/read-preference-orders.schema'
import ReadCollaborationOrdersSchema, { ReadCollaborationOrders } from '../../collaborations/generated-schemas/read-collaboration-orders.schema'
import ReadCategoryOrdersSchema, { ReadCategoryOrders } from '../../categories/generated-schemas/read-category-orders.schema'
import ReadCountryOrdersSchema, { ReadCountryOrders } from '../../countries/generated-schemas/read-country-orders.schema'



export class ReadBrandProfileOrders {storeName?: OrderDirectionEnum;
brandName?: OrderDirectionEnum;
storeBio?: OrderDirectionEnum;
website?: OrderDirectionEnum;
isPublished?: OrderDirectionEnum;
shippingCost?: OrderDirectionEnum;
currency?: OrderDirectionEnum;
brandManagerFullName?: OrderDirectionEnum;
user?: ReadUserOrders | OrderDirectionEnum;
logo?: ReadMediaOrders | OrderDirectionEnum;
cover?: ReadMediaOrders | OrderDirectionEnum;
collections?: ReadCollectionOrders | OrderDirectionEnum;
products?: ReadProductOrders | OrderDirectionEnum;
promotions?: ReadPromotionOrders | OrderDirectionEnum;
promoCodes?: ReadPromoCodeOrders | OrderDirectionEnum;
brandOrders?: ReadBrandOrderOrders | OrderDirectionEnum;
preferences?: ReadPreferenceOrders | OrderDirectionEnum;
collaborations?: ReadCollaborationOrders | OrderDirectionEnum;
categories?: ReadCategoryOrders | OrderDirectionEnum;
subCategories?: ReadCategoryOrders | OrderDirectionEnum;
countries?: ReadCountryOrders | OrderDirectionEnum;
logoId?: OrderDirectionEnum;
isFollowing?: OrderDirectionEnum;
hasStory?: OrderDirectionEnum;
followersCount?: OrderDirectionEnum;
followingCount?: OrderDirectionEnum;
postsCount?: OrderDirectionEnum}

const ReadBrandProfileOrdersSchema: v.GenericSchema<ReadBrandProfileOrders> = v.object({storeName: v.optional(OrderDirectionSchema),
brandName: v.optional(OrderDirectionSchema),
storeBio: v.optional(OrderDirectionSchema),
website: v.optional(OrderDirectionSchema),
isPublished: v.optional(OrderDirectionSchema),
shippingCost: v.optional(OrderDirectionSchema),
currency: v.optional(OrderDirectionSchema),
brandManagerFullName: v.optional(OrderDirectionSchema),
user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
logo: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
cover: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
collections: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCollectionOrdersSchema)])),
products: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
promotions: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
promoCodes: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
brandOrders: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandOrderOrdersSchema)])),
preferences: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPreferenceOrdersSchema)])),
collaborations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
categories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
subCategories: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
countries: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCountryOrdersSchema)])),
logoId: v.optional(OrderDirectionSchema),
isFollowing: v.optional(OrderDirectionSchema),
hasStory: v.optional(OrderDirectionSchema),
followersCount: v.optional(OrderDirectionSchema),
followingCount: v.optional(OrderDirectionSchema),
postsCount: v.optional(OrderDirectionSchema)});

export default ReadBrandProfileOrdersSchema;




export type TReadBrandProfileOrdersSchemaOutput = v.InferOutput<typeof ReadBrandProfileOrdersSchema>;
export type TReadBrandProfileOrdersSchemaInput = v.InferInput<typeof ReadBrandProfileOrdersSchema>;
