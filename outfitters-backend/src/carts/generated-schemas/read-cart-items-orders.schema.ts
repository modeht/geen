import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadCartOrdersSchema, ReadCartOrders } from './read-cart-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import { ReadProductVariantOrdersSchema, ReadProductVariantOrders } from '../../products/generated-schemas/read-product-variant-orders.schema'
import { ReadAffiliationLinkOrdersSchema, ReadAffiliationLinkOrders } from '../../affiliation-links/generated-schemas/read-affiliation-link-orders.schema'



export class ReadCartItemsOrders {cart?: ReadCartOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
variant?: ReadProductVariantOrders | OrderDirectionEnum | undefined;
affiliationLink?: ReadAffiliationLinkOrders | OrderDirectionEnum | undefined}

export const ReadCartItemsOrdersSchema: v.GenericSchema<ReadCartItemsOrders> = v.object({cart: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
variant: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
affiliationLink: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadAffiliationLinkOrdersSchema)]))})



export type TReadCartItemsOrdersSchemaOutput = v.InferOutput<typeof ReadCartItemsOrdersSchema>;
export type TReadCartItemsOrdersSchemaInput = v.InferInput<typeof ReadCartItemsOrdersSchema>;
