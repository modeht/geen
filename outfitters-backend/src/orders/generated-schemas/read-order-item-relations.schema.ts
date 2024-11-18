import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadBrandOrderRelationsSchema, ReadBrandOrderRelationsSchemaRelations } from './read-brand-order-relations.schema'
import { ReadProductVariantRelationsSchema, ReadProductVariantRelationsSchemaRelations } from '../../products/generated-schemas/read-product-variant-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'

export class ReadOrderItemRelationsSchemaRelations {brandOrder?: ReadBrandOrderRelationsSchemaRelations | boolean | null | undefined;
variant?: ReadProductVariantRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
appliedPromoCode?: ReadPromoCodeRelationsSchemaRelations | boolean | null | undefined;
appliedPromotions?: ReadPromotionRelationsSchemaRelations | boolean | null | undefined}

export const ReadOrderItemRelationsSchema: v.GenericSchema<ReadOrderItemRelationsSchemaRelations> = v.object({brandOrder: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandOrderRelationsSchema)])),
variant: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductVariantRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
appliedPromoCode: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromoCodeRelationsSchema)])),
appliedPromotions: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)]))})



export type TReadOrderItemRelationsSchemaOutput = v.InferOutput<typeof ReadOrderItemRelationsSchema>;
export type TReadOrderItemRelationsSchemaInput = v.InferInput<typeof ReadOrderItemRelationsSchema>;
