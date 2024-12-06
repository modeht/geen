import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadBrandProfileOrdersSchema, {
	ReadBrandProfileOrders,
} from '../../users/generated-schemas/read-brand-profile-orders.schema';
import ReadProductOrdersSchema, {
	ReadProductOrders,
} from '../../products/generated-schemas/read-product-orders.schema';

export class ReadCollectionOrders {
	name?: OrderDirectionEnum;
	isFeatured?: OrderDirectionEnum;
	isPublic?: OrderDirectionEnum;
	cover?: ReadMediaOrders | OrderDirectionEnum;
	brand?: ReadBrandProfileOrders | OrderDirectionEnum;
	products?: ReadProductOrders | OrderDirectionEnum;
	brandId?: OrderDirectionEnum;
}

const ReadCollectionOrdersSchema: v.GenericSchema<ReadCollectionOrders> = v.object({
	name: v.optional(OrderDirectionSchema),
	isFeatured: v.optional(OrderDirectionSchema),
	isPublic: v.optional(OrderDirectionSchema),
	cover: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	brand: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
	products: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
	brandId: v.optional(OrderDirectionSchema),
});

export default ReadCollectionOrdersSchema;

export type TReadCollectionOrdersSchemaOutput = v.InferOutput<typeof ReadCollectionOrdersSchema>;
export type TReadCollectionOrdersSchemaInput = v.InferInput<typeof ReadCollectionOrdersSchema>;
