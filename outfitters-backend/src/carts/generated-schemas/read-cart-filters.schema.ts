import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { CartStatus } from '../entities/cart.entity';
import { ReadOrderFiltersSchema, ReadOrderFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-filters.schema'
import { ReadCartItemsFiltersSchema, ReadCartItemsFiltersSchemaFilters } from './read-cart-items-filters.schema'
import { ReadShopperProfileFiltersSchema, ReadShopperProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-shopper-profile-filters.schema'
import { ReadPromoCodeFiltersSchema, ReadPromoCodeFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promo-code-filters.schema'



export class ReadCartFiltersSchemaFilters {status?: CartStatus | null | undefined;
order?: ReadOrderFiltersSchemaFilters | null | undefined;
items?: ReadCartItemsFiltersSchemaFilters | null | undefined;
shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null | undefined;
promoCode?: ReadPromoCodeFiltersSchemaFilters | null | undefined;
promoCodeId?: GenericComparable<"number"> | null | undefined;
shopperId?: GenericComparable<"number"> | null | undefined}

export const ReadCartFiltersSchema: v.GenericSchema<ReadCartFiltersSchemaFilters> = v.object({status: v.nullish(v.enum(CartStatus)),
order: v.nullish(v.lazy(() => ReadOrderFiltersSchema)),
items: v.nullish(v.lazy(() => ReadCartItemsFiltersSchema)),
shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
promoCode: v.nullish(v.lazy(() => ReadPromoCodeFiltersSchema)),
promoCodeId: v.nullish(comparable("number")),
shopperId: v.nullish(comparable("number"))})



export type TReadCartFiltersSchemaOutput = v.InferOutput<typeof ReadCartFiltersSchema>;
export type TReadCartFiltersSchemaInput = v.InferInput<typeof ReadCartFiltersSchema>;