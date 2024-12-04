import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadProductOrdersSchema, { ReadProductOrders } from './read-product-orders.schema'
import ReadPostOrdersSchema, { ReadPostOrders } from '../../posts/generated-schemas/read-post-orders.schema'
import ReadStoryOrdersSchema, { ReadStoryOrders } from '../../stories/generated-schemas/read-story-orders.schema'
import ReadAffiliationLinkOrdersSchema, { ReadAffiliationLinkOrders } from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema'



export class ReadTaggedProductOrders {product?: ReadProductOrders | OrderDirectionEnum;
post?: ReadPostOrders | OrderDirectionEnum;
story?: ReadStoryOrders | OrderDirectionEnum;
affiliationLink?: ReadAffiliationLinkOrders | OrderDirectionEnum;
productId?: OrderDirectionEnum;
postId?: OrderDirectionEnum;
storyId?: OrderDirectionEnum;
affiliationLinkId?: OrderDirectionEnum}

const ReadTaggedProductOrdersSchema: v.GenericSchema<ReadTaggedProductOrders> = v.object({product: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
post: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadPostOrdersSchema)])),
story: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadStoryOrdersSchema)])),
affiliationLink: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)])),
productId: v.optional(OrderDirectionSchema),
postId: v.optional(OrderDirectionSchema),
storyId: v.optional(OrderDirectionSchema),
affiliationLinkId: v.optional(OrderDirectionSchema)});

export default ReadTaggedProductOrdersSchema;




export type TReadTaggedProductOrdersSchemaOutput = v.InferOutput<typeof ReadTaggedProductOrdersSchema>;
export type TReadTaggedProductOrdersSchemaInput = v.InferInput<typeof ReadTaggedProductOrdersSchema>;
