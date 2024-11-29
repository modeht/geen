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



export class ReadBrandProfileOrders {storeName?: OrderDirectionEnum | undefined;
brandName?: OrderDirectionEnum | undefined;
storeBio?: OrderDirectionEnum | undefined;
website?: OrderDirectionEnum | undefined;
isPublished?: OrderDirectionEnum | undefined;
shippingCost?: OrderDirectionEnum | undefined;
currency?: OrderDirectionEnum | undefined;
brandManagerFullName?: OrderDirectionEnum | undefined;
user?: ReadUserOrders | OrderDirectionEnum | undefined;
logo?: ReadMediaOrders | OrderDirectionEnum | undefined;
cover?: ReadMediaOrders | OrderDirectionEnum | undefined;
collections?: ReadCollectionOrders | OrderDirectionEnum | undefined;
products?: ReadProductOrders | OrderDirectionEnum | undefined;
promotions?: ReadPromotionOrders | OrderDirectionEnum | undefined;
promoCodes?: ReadPromoCodeOrders | OrderDirectionEnum | undefined;
brandOrders?: ReadBrandOrderOrders | OrderDirectionEnum | undefined;
preferences?: ReadPreferenceOrders | OrderDirectionEnum | undefined;
collaborations?: ReadCollaborationOrders | OrderDirectionEnum | undefined;
categories?: ReadCategoryOrders | OrderDirectionEnum | undefined;
subCategories?: ReadCategoryOrders | OrderDirectionEnum | undefined;
countries?: ReadCountryOrders | OrderDirectionEnum | undefined;
logoId?: OrderDirectionEnum | undefined;
isFollowing?: OrderDirectionEnum | undefined;
hasStory?: OrderDirectionEnum | undefined;
followersCount?: OrderDirectionEnum | undefined;
followingCount?: OrderDirectionEnum | undefined;
postsCount?: OrderDirectionEnum | undefined}

const ReadBrandProfileOrdersSchema: v.GenericSchema<ReadBrandProfileOrders> = v.object({storeName: v.undefinedable(OrderDirectionSchema),
brandName: v.undefinedable(OrderDirectionSchema),
storeBio: v.undefinedable(OrderDirectionSchema),
website: v.undefinedable(OrderDirectionSchema),
isPublished: v.undefinedable(OrderDirectionSchema),
shippingCost: v.undefinedable(OrderDirectionSchema),
currency: v.undefinedable(OrderDirectionSchema),
brandManagerFullName: v.undefinedable(OrderDirectionSchema),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
logo: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
cover: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
collections: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollectionOrdersSchema)])),
products: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
promotions: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
promoCodes: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
brandOrders: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandOrderOrdersSchema)])),
preferences: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPreferenceOrdersSchema)])),
collaborations: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
categories: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
subCategories: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
countries: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCountryOrdersSchema)])),
logoId: v.undefinedable(OrderDirectionSchema),
isFollowing: v.undefinedable(OrderDirectionSchema),
hasStory: v.undefinedable(OrderDirectionSchema),
followersCount: v.undefinedable(OrderDirectionSchema),
followingCount: v.undefinedable(OrderDirectionSchema),
postsCount: v.undefinedable(OrderDirectionSchema)});

export default ReadBrandProfileOrdersSchema;




export type TReadBrandProfileOrdersSchemaOutput = v.InferOutput<typeof ReadBrandProfileOrdersSchema>;
export type TReadBrandProfileOrdersSchemaInput = v.InferInput<typeof ReadBrandProfileOrdersSchema>;
