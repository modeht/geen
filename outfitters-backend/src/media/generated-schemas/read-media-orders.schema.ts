import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadPreferenceOrdersSchema, ReadPreferenceOrders } from '../../preferences/generated-schemas/read-preference-orders.schema'
import { ReadCollectionOrdersSchema, ReadCollectionOrders } from '../../collections/generated-schemas/read-collection-orders.schema'
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'
import { ReadStoryOrdersSchema, ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadCategoryOrdersSchema, ReadCategoryOrders } from '../../categories/generated-schemas/read-category-orders.schema'
import { ReadCountryOrdersSchema, ReadCountryOrders } from '../../countries/generated-schemas/read-country-orders.schema'
import { ReadPostOrdersSchema, ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import { ReadProductVariantOrdersSchema, ReadProductVariantOrders } from '../../products/generated-schemas/read-product-variant-orders.schema'
import { ReadMessageOrdersSchema, ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'
import { ReadProductReviewOrdersSchema, ReadProductReviewOrders } from '../../products/generated-schemas/read-product-review-orders.schema'



export class ReadMediaOrders {preference?: ReadPreferenceOrders | OrderDirectionEnum | undefined;
collectionCover?: ReadCollectionOrders | OrderDirectionEnum | undefined;
user?: ReadShopperProfileOrders | OrderDirectionEnum | undefined;
story?: ReadStoryOrders | OrderDirectionEnum | undefined;
brandStoreCover?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
brandStoreLogo?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
category?: ReadCategoryOrders | OrderDirectionEnum | undefined;
country?: ReadCountryOrders | OrderDirectionEnum | undefined;
postThumbnail?: ReadPostOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
productVariant?: ReadProductVariantOrders | OrderDirectionEnum | undefined;
message?: ReadMessageOrders | OrderDirectionEnum | undefined;
post?: ReadPostOrders | OrderDirectionEnum | undefined;
review?: ReadProductReviewOrders | OrderDirectionEnum | undefined;
mimetype?: OrderDirectionEnum | undefined;
url?: OrderDirectionEnum | undefined;
size?: OrderDirectionEnum | undefined;
width?: OrderDirectionEnum | undefined;
height?: OrderDirectionEnum | undefined}

export const ReadMediaOrdersSchema: v.GenericSchema<ReadMediaOrders> = v.object({preference: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPreferenceOrdersSchema)])),
collectionCover: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollectionOrdersSchema)])),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
story: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
brandStoreCover: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
brandStoreLogo: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
category: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
country: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCountryOrdersSchema)])),
postThumbnail: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
productVariant: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
message: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
post: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
review: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductReviewOrdersSchema)])),
mimetype: v.undefinedable(OrderDirectionSchema),
url: v.undefinedable(OrderDirectionSchema),
size: v.undefinedable(OrderDirectionSchema),
width: v.undefinedable(OrderDirectionSchema),
height: v.undefinedable(OrderDirectionSchema)})



export type TReadMediaOrdersSchemaOutput = v.InferOutput<typeof ReadMediaOrdersSchema>;
export type TReadMediaOrdersSchemaInput = v.InferInput<typeof ReadMediaOrdersSchema>;
