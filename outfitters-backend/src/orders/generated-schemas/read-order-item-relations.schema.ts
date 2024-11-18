import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadBrandOrderRelationsSchema, ReadBrandOrderRelations } from './read-brand-order-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'



export class ReadOrderItemRelations {brandOrder?: ReadBrandOrderRelations | boolean | null | undefined;
variant?: ReadProductVariantRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined;
appliedPromoCode?: ReadPromoCodeRelations | boolean | null | undefined;
appliedPromotions?: ReadPromotionRelations | boolean | null | undefined}

export const ReadOrderItemRelationsSchema: v.GenericSchema<ReadOrderItemRelations> = v.object({brandOrder: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandOrderRelationsSchema)])),
variant: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
appliedPromoCode: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromoCodeRelationsSchema)])),
appliedPromotions: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)]))})



export type TReadOrderItemRelationsSchemaOutput = v.InferOutput<typeof ReadOrderItemRelationsSchema>;
export type TReadOrderItemRelationsSchemaInput = v.InferInput<typeof ReadOrderItemRelationsSchema>;
