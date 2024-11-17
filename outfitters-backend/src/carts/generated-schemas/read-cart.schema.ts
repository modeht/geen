import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { CartStatus } from '../entities/cart.entity';
import { ReadOrderSchema, ReadOrderSchemaFilters } from '../../orders/generated-schemas/read-order.schema'
import { ReadCartItemsSchema, ReadCartItemsSchemaFilters } from './read-cart-items.schema'
import { ReadShopperProfileSchema, ReadShopperProfileSchemaFilters } from '../../users/generated-schemas/read-shopper-profile.schema'
import { ReadPromoCodeSchema, ReadPromoCodeSchemaFilters } from '../../promotions/generated-schemas/read-promo-code.schema'

export class ReadCartSchemaFilters {order?: ReadOrderSchemaFilters | null | undefined;
items?: ReadCartItemsSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileSchemaFilters | null | undefined;
promoCode?: ReadPromoCodeSchemaFilters | null | undefined;
promoCodeId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadCartSchema: v.GenericSchema<ReadCartSchemaFilters> = v.object({order: v.nullish(v.lazy(() => ReadOrderSchema)),
items: v.nullish(v.lazy(() => ReadCartItemsSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileSchema)),
promoCode: v.nullish(v.lazy(() => ReadPromoCodeSchema)),
promoCodeId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadCartSchema = v.InferOutput<typeof ReadCartSchema>
export type TReadCartSchemaInput = v.InferInput<typeof ReadCartSchema>
