import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadProductOrdersSchema, { ReadProductOrders } from './read-product-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import ReadStoryOrdersSchema, { ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema'
import ReadAffiliationLinkOrdersSchema, { ReadAffiliationLinkOrders } from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema'



export class ReadTaggedProductOrders {product?: ReadProductOrders | OrderDirectionEnum | undefined;
post?: ReadPostOrders | OrderDirectionEnum | undefined;
story?: ReadStoryOrders | OrderDirectionEnum | undefined;
affiliationLink?: ReadAffiliationLinkOrders | OrderDirectionEnum | undefined;
productId?: OrderDirectionEnum | undefined;
postId?: OrderDirectionEnum | undefined;
storyId?: OrderDirectionEnum | undefined;
affiliationLinkId?: OrderDirectionEnum | undefined}

const ReadTaggedProductOrdersSchema: v.GenericSchema<ReadTaggedProductOrders> = v.object({product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
post: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
story: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
affiliationLink: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
productId: v.undefinedable(OrderDirectionSchema),
postId: v.undefinedable(OrderDirectionSchema),
storyId: v.undefinedable(OrderDirectionSchema),
affiliationLinkId: v.undefinedable(OrderDirectionSchema)});

export default ReadTaggedProductOrdersSchema;




export type TReadTaggedProductOrdersSchemaOutput = v.InferOutput<typeof ReadTaggedProductOrdersSchema>;
export type TReadTaggedProductOrdersSchemaInput = v.InferInput<typeof ReadTaggedProductOrdersSchema>;
