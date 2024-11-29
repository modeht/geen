import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import ReadBrandProfileOrdersSchema, { ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import ReadProductOrdersSchema, { ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'



export class ReadCollectionOrders {name?: OrderDirectionEnum | undefined;
isFeatured?: OrderDirectionEnum | undefined;
isPublic?: OrderDirectionEnum | undefined;
cover?: ReadMediaOrders | OrderDirectionEnum | undefined;
brand?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
products?: ReadProductOrders | OrderDirectionEnum | undefined;
brandId?: OrderDirectionEnum | undefined}

const ReadCollectionOrdersSchema: v.GenericSchema<ReadCollectionOrders> = v.object({name: v.undefinedable(OrderDirectionSchema),
isFeatured: v.undefinedable(OrderDirectionSchema),
isPublic: v.undefinedable(OrderDirectionSchema),
cover: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
brand: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
products: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
brandId: v.undefinedable(OrderDirectionSchema)});

export default ReadCollectionOrdersSchema;




export type TReadCollectionOrdersSchemaOutput = v.InferOutput<typeof ReadCollectionOrdersSchema>;
export type TReadCollectionOrdersSchemaInput = v.InferInput<typeof ReadCollectionOrdersSchema>;
