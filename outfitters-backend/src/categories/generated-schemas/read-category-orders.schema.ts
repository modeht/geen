import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadSeasonalPromotionOrdersSchema, ReadSeasonalPromotionOrders } from '../../promotions/generated-schemas/read-seasonal-promotion-orders.schema'



export class ReadCategoryOrders {media?: ReadMediaOrders | OrderDirectionEnum | undefined;
subCategories?: ReadCategoryOrders | OrderDirectionEnum | undefined;
superCategory?: ReadCategoryOrders | OrderDirectionEnum | undefined;
products?: ReadProductOrders | OrderDirectionEnum | undefined;
categorybrandProfiles?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
subCategoriesBrandProfiles?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
seasonalPromotions?: ReadSeasonalPromotionOrders | OrderDirectionEnum | undefined}

export const ReadCategoryOrdersSchema: v.GenericSchema<ReadCategoryOrders> = v.object({media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
subCategories: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
superCategory: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCategoryOrdersSchema)])),
products: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
categorybrandProfiles: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
subCategoriesBrandProfiles: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
seasonalPromotions: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSeasonalPromotionOrdersSchema)]))})



export type TReadCategoryOrdersSchemaOutput = v.InferOutput<typeof ReadCategoryOrdersSchema>;
export type TReadCategoryOrdersSchemaInput = v.InferInput<typeof ReadCategoryOrdersSchema>;
