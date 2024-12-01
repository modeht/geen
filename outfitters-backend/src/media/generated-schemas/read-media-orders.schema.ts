import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadPreferenceOrdersSchema, { ReadPreferenceOrders } from '../../preferences/generated-schemas/read-preference-orders.schema'
import ReadCollectionOrdersSchema, { ReadCollectionOrders } from '../../collections/generated-schemas/read-collection-orders.schema'
import ReadShopperProfileOrdersSchema, { ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import ReadStoryOrdersSchema, { ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema'
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import ReadCategoryOrdersSchema, { ReadCategoryOrders } from '../../categories/generated-schemas/read-category-orders.schema'
import ReadCountryOrdersSchema, { ReadCountryOrders } from '../../countries/generated-schemas/read-country-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import ReadProductVariantOrdersSchema, { ReadProductVariantOrders } from '../../products/generated-schemas/read-product-variant-orders.schema'
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'
import ReadProductReviewOrdersSchema, { ReadProductReviewOrders } from '../../products/generated-schemas/read-product-review-orders.schema'



export class ReadMediaOrders {preference?: ReadPreferenceOrders | OrderDirectionEnum;
collectionCover?: ReadCollectionOrders | OrderDirectionEnum;
user?: ReadShopperProfileOrders | OrderDirectionEnum;
story?: ReadStoryOrders | OrderDirectionEnum;
brandStoreCover?: ReadBrandProfileOrders | OrderDirectionEnum;
brandStoreLogo?: ReadBrandProfileOrders | OrderDirectionEnum;
category?: ReadCategoryOrders | OrderDirectionEnum;
country?: ReadCountryOrders | OrderDirectionEnum;
postThumbnail?: ReadPostOrders | OrderDirectionEnum;
product?: ReadProductOrders | OrderDirectionEnum;
productVariant?: ReadProductVariantOrders | OrderDirectionEnum;
message?: ReadMessageOrders | OrderDirectionEnum;
post?: ReadPostOrders | OrderDirectionEnum;
review?: ReadProductReviewOrders | OrderDirectionEnum;
mimetype?: OrderDirectionEnum;
url?: OrderDirectionEnum;
size?: OrderDirectionEnum;
width?: OrderDirectionEnum;
height?: OrderDirectionEnum}

const ReadMediaOrdersSchema: v.GenericSchema<ReadMediaOrders> = v.object({preference: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPreferenceOrdersSchema)])),
collectionCover: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCollectionOrdersSchema)])),
user: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
story: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
brandStoreCover: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
brandStoreLogo: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
category: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
country: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCountryOrdersSchema)])),
postThumbnail: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
productVariant: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
message: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
post: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
review: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductReviewOrdersSchema)])),
mimetype: v.optional(OrderDirectionSchema),
url: v.optional(OrderDirectionSchema),
size: v.optional(OrderDirectionSchema),
width: v.optional(OrderDirectionSchema),
height: v.optional(OrderDirectionSchema)});

export default ReadMediaOrdersSchema;




export type TReadMediaOrdersSchemaOutput = v.InferOutput<typeof ReadMediaOrdersSchema>;
export type TReadMediaOrdersSchemaInput = v.InferInput<typeof ReadMediaOrdersSchema>;
