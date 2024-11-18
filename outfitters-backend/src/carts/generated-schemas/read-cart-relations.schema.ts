import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { CartStatus } from '../entities/cart.entity';
import {
	ReadOrderRelationsSchema,
	ReadOrderRelationsSchemaRelations,
} from '../../orders/generated-schemas/read-order-relations.schema';
import {
	ReadCartItemsRelationsSchema,
	ReadCartItemsRelationsSchemaRelations,
} from './read-cart-items-relations.schema';
import {
	ReadShopperProfileRelationsSchema,
	ReadShopperProfileRelationsSchemaRelations,
} from '../../users/generated-schemas/read-shopper-profile-relations.schema';
import {
	ReadPromoCodeRelationsSchema,
	ReadPromoCodeRelationsSchemaRelations,
} from '../../promotions/generated-schemas/read-promo-code-relations.schema';

export class ReadCartRelationsSchemaRelations {
	order?: ReadOrderRelationsSchemaRelations | boolean | null | undefined;
	items?: ReadCartItemsRelationsSchemaRelations | boolean | null | undefined;
	shopperProfile?:
		| ReadShopperProfileRelationsSchemaRelations
		| boolean
		| null
		| undefined;
	promoCode?: ReadPromoCodeRelationsSchemaRelations | boolean | null | undefined;
}

export const ReadCartRelationsSchema: v.GenericSchema<ReadCartRelationsSchemaRelations> =
	v.object({
		order: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderRelationsSchema)])),
		items: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartItemsRelationsSchema)])),
		shopperProfile: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)]),
		),
		promoCode: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadPromoCodeRelationsSchema)]),
		),
	});

export type TReadCartRelationsSchemaOutput = v.InferOutput<
	typeof ReadCartRelationsSchema
>;
export type TReadCartRelationsSchemaInput = v.InferInput<typeof ReadCartRelationsSchema>;
