import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadCartRelationsSchema, { ReadCartRelations } from '../../carts/generated-schemas/read-cart-relations.schema';
import ReadOrderItemRelationsSchema, {
	ReadOrderItemRelations,
} from '../../orders/generated-schemas/read-order-item-relations.schema';
import ReadBrandProfileRelationsSchema, {
	ReadBrandProfileRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';
import ReadShopperProfileRelationsSchema, {
	ReadShopperProfileRelations,
} from '../../users/generated-schemas/read-shopper-profile-relations.schema';
import ReadProductRelationsSchema, {
	ReadProductRelations,
} from '../../products/generated-schemas/read-product-relations.schema';

import { PromotionTypeEnum } from '../entities/enums';
import { PromotionStatusEnum } from '../entities/enums';
export class ReadPromoCodeRelations {
	type?: PromotionTypeEnum | null;
	status?: PromotionStatusEnum | null;
	carts?: ReadCartRelations | string | boolean;
	orderItems?: ReadOrderItemRelations | string | boolean;
	brand?: ReadBrandProfileRelations | string | boolean;
	shopperProfile?: ReadShopperProfileRelations | string | boolean;
	products?: ReadProductRelations | string | boolean;
}

const ReadPromoCodeRelationsSchema: v.GenericSchema<ReadPromoCodeRelations> = v.object({
	type: v.nullish(v.enum(PromotionTypeEnum)),
	status: v.nullish(v.enum(PromotionStatusEnum)),
	carts: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCartRelationsSchema),
		]),
	),
	orderItems: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrderItemRelationsSchema),
		]),
	),
	brand: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandProfileRelationsSchema),
		]),
	),
	shopperProfile: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadShopperProfileRelationsSchema),
		]),
	),
	products: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductRelationsSchema),
		]),
	),
});

export default ReadPromoCodeRelationsSchema;

export type TReadPromoCodeRelationsSchemaOutput = v.InferOutput<typeof ReadPromoCodeRelationsSchema>;
export type TReadPromoCodeRelationsSchemaInput = v.InferInput<typeof ReadPromoCodeRelationsSchema>;
