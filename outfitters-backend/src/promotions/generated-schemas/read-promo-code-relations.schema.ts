import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartRelationsSchema, ReadCartRelations } from '../../carts/generated-schemas/read-cart-relations.schema'
import { ReadOrderItemRelationsSchema, ReadOrderItemRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'


import { PromotionTypeEnum } from '../entities/enums'
import { PromotionStatusEnum } from '../entities/enums'
export class ReadPromoCodeRelations {type?: PromotionTypeEnum | null | undefined;
status?: PromotionStatusEnum | null | undefined;
carts?: ReadCartRelations | boolean | null | undefined;
orderItems?: ReadOrderItemRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined;
products?: ReadProductRelations | boolean | null | undefined}

export const ReadPromoCodeRelationsSchema: v.GenericSchema<ReadPromoCodeRelations> = v.object({type: v.nullish(v.enum(PromotionTypeEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
carts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartRelationsSchema)])),
orderItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadPromoCodeRelationsSchemaOutput = v.InferOutput<typeof ReadPromoCodeRelationsSchema>;
export type TReadPromoCodeRelationsSchemaInput = v.InferInput<typeof ReadPromoCodeRelationsSchema>;
