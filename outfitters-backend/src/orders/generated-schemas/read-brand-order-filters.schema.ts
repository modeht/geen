import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { OrderStatusEnum } from '../entities/brand-orders.entity';
import ReadOrderItemFiltersSchema, { ReadOrderItemFiltersSchemaFilters } from './read-order-item-filters.schema';
import ReadBrandProfileFiltersSchema, {
	ReadBrandProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile-filters.schema';
import ReadOrderFiltersSchema, { ReadOrderFiltersSchemaFilters } from './read-order-filters.schema';

export class ReadBrandOrderFiltersSchemaFilters {
	status?: OrderStatusEnum | null;
	totalSalePrice?: GenericComparable<'number'> | null;
	totalPurchasePrice?: GenericComparable<'number'> | null;
	shippingFees?: GenericComparable<'number'> | null;
	rating?: GenericComparable<'number'> | null;
	review?: GenericComparable<'string'> | null;
	expectedDeliveryDate?: GenericComparable<'date'> | null;
	acceptedAt?: GenericComparable<'date'> | null;
	shippedAt?: GenericComparable<'date'> | null;
	deliveredAt?: GenericComparable<'date'> | null;
	cancelledAt?: GenericComparable<'date'> | null;
	items?: ReadOrderItemFiltersSchemaFilters | null;
	brand?: ReadBrandProfileFiltersSchemaFilters | null;
	order?: ReadOrderFiltersSchemaFilters | null;
	orderId?: GenericComparable<'number'> | null;
	brandId?: GenericComparable<'number'> | null;
}

const ReadBrandOrderFiltersSchema: v.GenericSchema<ReadBrandOrderFiltersSchemaFilters> = v.object({
	status: v.nullish(v.enum(OrderStatusEnum)),
	totalSalePrice: v.nullish(comparable('number')),
	totalPurchasePrice: v.nullish(comparable('number')),
	shippingFees: v.nullish(comparable('number')),
	rating: v.nullish(comparable('number')),
	review: v.nullish(comparable('string')),
	expectedDeliveryDate: v.nullish(comparable('date')),
	acceptedAt: v.nullish(comparable('date')),
	shippedAt: v.nullish(comparable('date')),
	deliveredAt: v.nullish(comparable('date')),
	cancelledAt: v.nullish(comparable('date')),
	items: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
	brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	order: v.nullish(v.lazy(() => ReadOrderFiltersSchema)),
	orderId: v.nullish(comparable('number')),
	brandId: v.nullish(comparable('number')),
});

export default ReadBrandOrderFiltersSchema;

export type TReadBrandOrderFiltersSchemaOutput = v.InferOutput<typeof ReadBrandOrderFiltersSchema>;
export type TReadBrandOrderFiltersSchemaInput = v.InferInput<typeof ReadBrandOrderFiltersSchema>;
