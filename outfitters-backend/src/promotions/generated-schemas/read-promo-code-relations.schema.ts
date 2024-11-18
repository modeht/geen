import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadCartRelationsSchema, ReadCartRelationsSchemaRelations } from '../../carts/generated-schemas/read-cart-relations.schema'
import { ReadOrderItemRelationsSchema, ReadOrderItemRelationsSchemaRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'

export class ReadPromoCodeRelationsSchemaRelations {carts?: ReadCartRelationsSchemaRelations | boolean | null | undefined;
orderItems?: ReadOrderItemRelationsSchemaRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelationsSchemaRelations | boolean | null | undefined;
products?: ReadProductRelationsSchemaRelations | boolean | null | undefined}

export const ReadPromoCodeRelationsSchema: v.GenericSchema<ReadPromoCodeRelationsSchemaRelations> = v.object({carts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartRelationsSchema)])),
orderItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadPromoCodeRelationsSchema = v.InferOutput<typeof ReadPromoCodeRelationsSchema>;

export type TReadPromoCodeRelationsSchemaInput = v.InferInput<typeof ReadPromoCodeRelationsSchema>;
