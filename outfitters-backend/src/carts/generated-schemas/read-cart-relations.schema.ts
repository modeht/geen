import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { CartStatus } from '../entities/cart.entity';
import { ReadOrderRelationsSchema, ReadOrderRelations } from '../../orders/generated-schemas/read-order-relations.schema'
import { ReadCartItemsRelationsSchema, ReadCartItemsRelations } from './read-cart-items-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'



export class ReadCartRelations {status?: CartStatus | null | undefined;
order?: ReadOrderRelations | boolean | null | undefined;
items?: ReadCartItemsRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined;
promoCode?: ReadPromoCodeRelations | boolean | null | undefined}

export const ReadCartRelationsSchema: v.GenericSchema<ReadCartRelations> = v.object({status: v.nullish(v.enum(CartStatus)),
order: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderRelationsSchema)])),
items: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartItemsRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
promoCode: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromoCodeRelationsSchema)]))})



export type TReadCartRelationsSchemaOutput = v.InferOutput<typeof ReadCartRelationsSchema>;
export type TReadCartRelationsSchemaInput = v.InferInput<typeof ReadCartRelationsSchema>;
