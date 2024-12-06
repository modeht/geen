import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { CartStatus } from '../entities/cart.entity';
import ReadOrderRelationsSchema, {
	ReadOrderRelations,
} from '../../orders/generated-schemas/read-order-relations.schema';
import ReadCartItemsRelationsSchema, { ReadCartItemsRelations } from './read-cart-items-relations.schema';
import ReadShopperProfileRelationsSchema, {
	ReadShopperProfileRelations,
} from '../../users/generated-schemas/read-shopper-profile-relations.schema';
import ReadPromoCodeRelationsSchema, {
	ReadPromoCodeRelations,
} from '../../promotions/generated-schemas/read-promo-code-relations.schema';

export class ReadCartRelations {
	status?: CartStatus | null;
	order?: ReadOrderRelations | string | boolean;
	items?: ReadCartItemsRelations | string | boolean;
	shopperProfile?: ReadShopperProfileRelations | string | boolean;
	promoCode?: ReadPromoCodeRelations | string | boolean;
}

const ReadCartRelationsSchema: v.GenericSchema<ReadCartRelations> = v.object({
	status: v.nullish(v.enum(CartStatus)),
	order: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrderRelationsSchema),
		]),
	),
	items: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCartItemsRelationsSchema),
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
	promoCode: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromoCodeRelationsSchema),
		]),
	),
});

export default ReadCartRelationsSchema;

export type TReadCartRelationsSchemaOutput = v.InferOutput<typeof ReadCartRelationsSchema>;
export type TReadCartRelationsSchemaInput = v.InferInput<typeof ReadCartRelationsSchema>;
