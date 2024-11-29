import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import ReadOrderItemFiltersSchema, { ReadOrderItemFiltersSchemaFilters } from './read-order-item-filters.schema'
import ReadBrandProfileFiltersSchema, { ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import ReadOrderFiltersSchema, { ReadOrderFiltersSchemaFilters } from './read-order-filters.schema'



export class ReadBrandOrderFiltersSchemaFilters {status?: OrderStatusEnum | null | undefined;
totalSalePrice?: GenericComparable<"number"> | null | undefined;
totalPurchasePrice?: GenericComparable<"number"> | null | undefined;
shippingFees?: GenericComparable<"number"> | null | undefined;
rating?: GenericComparable<"number"> | null | undefined;
review?: GenericComparable<"string"> | null | undefined;
expectedDeliveryDate?: GenericComparable<"date"> | null | undefined;
acceptedAt?: GenericComparable<"date"> | null | undefined;
shippedAt?: GenericComparable<"date"> | null | undefined;
deliveredAt?: GenericComparable<"date"> | null | undefined;
cancelledAt?: GenericComparable<"date"> | null | undefined;
items?: ReadOrderItemFiltersSchemaFilters | null | undefined;
brand?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
order?: ReadOrderFiltersSchemaFilters | null | undefined;
orderId?: GenericComparable<"number"> | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined}

const ReadBrandOrderFiltersSchema: v.GenericSchema<ReadBrandOrderFiltersSchemaFilters> = v.object({status: v.nullish(v.enum(OrderStatusEnum)),
totalSalePrice: v.nullish(comparable("number")),
totalPurchasePrice: v.nullish(comparable("number")),
shippingFees: v.nullish(comparable("number")),
rating: v.nullish(comparable("number")),
review: v.nullish(comparable("string")),
expectedDeliveryDate: v.nullish(comparable("date")),
acceptedAt: v.nullish(comparable("date")),
shippedAt: v.nullish(comparable("date")),
deliveredAt: v.nullish(comparable("date")),
cancelledAt: v.nullish(comparable("date")),
items: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
order: v.nullish(v.lazy(() => ReadOrderFiltersSchema)),
orderId: v.nullish(comparable("number")),
brandId: v.nullish(comparable("number"))});

export default ReadBrandOrderFiltersSchema;




export type TReadBrandOrderFiltersSchemaOutput = v.InferOutput<typeof ReadBrandOrderFiltersSchema>;
export type TReadBrandOrderFiltersSchemaInput = v.InferInput<typeof ReadBrandOrderFiltersSchema>;
