import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema';
import ReadBrandProfileOrdersSchema, {
	ReadBrandProfileOrders,
} from '../../users/generated-schemas/read-brand-profile-orders.schema';
import ReadShopperProfileOrdersSchema, {
	ReadShopperProfileOrders,
} from '../../users/generated-schemas/read-shopper-profile-orders.schema';

export class ReadPreferenceOrders {
	media?: ReadMediaOrders | OrderDirectionEnum;
	name?: OrderDirectionEnum;
	brandProfile?: ReadBrandProfileOrders | OrderDirectionEnum;
	shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum;
	mediaId?: OrderDirectionEnum;
}

const ReadPreferenceOrdersSchema: v.GenericSchema<ReadPreferenceOrders> = v.object({
	media: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
	name: v.optional(OrderDirectionSchema),
	brandProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
	shopperProfile: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)])),
	mediaId: v.optional(OrderDirectionSchema),
});

export default ReadPreferenceOrdersSchema;

export type TReadPreferenceOrdersSchemaOutput = v.InferOutput<typeof ReadPreferenceOrdersSchema>;
export type TReadPreferenceOrdersSchemaInput = v.InferInput<typeof ReadPreferenceOrdersSchema>;
