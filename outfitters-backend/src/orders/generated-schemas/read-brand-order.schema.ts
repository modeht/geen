import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import { ReadOrderItemSchema, ReadOrderItemSchemaFilters } from './read-order-item.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadOrderSchema, ReadOrderSchemaFilters } from './read-order.schema'

export class ReadBrandOrderSchemaFilters {totalSalePrice?: GenericComparable<"number"> | null | undefined;
totalPurchasePrice?: GenericComparable<"number"> | null | undefined;
shippingFees?: GenericComparable<"number"> | null | undefined;
rating?: GenericComparable<"number"> | null | undefined;
review?: GenericComparable<"string"> | null | undefined;
expectedDeliveryDate?: GenericComparable<"date"> | null | undefined;
acceptedAt?: GenericComparable<"date"> | null | undefined;
shippedAt?: GenericComparable<"date"> | null | undefined;
deliveredAt?: GenericComparable<"date"> | null | undefined;
cancelledAt?: GenericComparable<"date"> | null | undefined;
items?: ReadOrderItemSchemaFilters | null | undefined;
brand?: ReadBrandProfileSchemaFilters | null | undefined;
order?: ReadOrderSchemaFilters | null | undefined;
orderId?: GenericComparable<"number"> | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined}

export const ReadBrandOrderSchema: v.GenericSchema<ReadBrandOrderSchemaFilters> = v.object({totalSalePrice: v.nullish(comparable("number")),
totalPurchasePrice: v.nullish(comparable("number")),
shippingFees: v.nullish(comparable("number")),
rating: v.nullish(comparable("number")),
review: v.nullish(comparable("string")),
expectedDeliveryDate: v.nullish(comparable("date")),
acceptedAt: v.nullish(comparable("date")),
shippedAt: v.nullish(comparable("date")),
deliveredAt: v.nullish(comparable("date")),
cancelledAt: v.nullish(comparable("date")),
items: v.nullish(v.lazy(() => ReadOrderItemSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
order: v.nullish(v.lazy(() => ReadOrderSchema)),
orderId: v.nullish(comparable("number")),
brandId: v.nullish(comparable("number"))})



export type TReadBrandOrderSchema = v.InferOutput<typeof ReadBrandOrderSchema>
export type TReadBrandOrderSchemaInput = v.InferInput<typeof ReadBrandOrderSchema>
