import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadNotificationSchema, ReadNotificationSchemaFilters } from '../../notifications/generated-schemas/read-notification.schema'
import { ReadBrandProfileSchema, ReadBrandProfileSchemaFilters } from '../../users/generated-schemas/read-brand-profile.schema'
import { ReadSeasonalPromotionSchema, ReadSeasonalPromotionSchemaFilters } from './read-seasonal-promotion.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'
import { ReadOrderItemSchema, ReadOrderItemSchemaFilters } from '../../orders/generated-schemas/read-order-item.schema'

export class ReadPromotionSchemaFilters {title?: GenericComparable<"string"> | null | undefined;
discountPercentage?: GenericComparable<"number"> | null | undefined;
minPurchaseAmount?: GenericComparable<"number"> | null | undefined;
start?: GenericComparable<"date"> | null | undefined;
end?: GenericComparable<"date"> | null | undefined;
notifications?: ReadNotificationSchemaFilters | null | undefined;
brand?: ReadBrandProfileSchemaFilters | null | undefined;
seasonalPromotion?: ReadSeasonalPromotionSchemaFilters | null | undefined;
products?: ReadProductSchemaFilters | null | undefined;
orderItems?: ReadOrderItemSchemaFilters | null | undefined;
isDeleted?: GenericComparable<"bool"> | null | undefined;
seasonalPromotionId?: GenericComparable<"number"> | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined}

export const ReadPromotionSchema: v.GenericSchema<ReadPromotionSchemaFilters> = v.object({title: v.nullish(comparable("string")),
discountPercentage: v.nullish(comparable("number")),
minPurchaseAmount: v.nullish(comparable("number")),
start: v.nullish(comparable("date")),
end: v.nullish(comparable("date")),
notifications: v.nullish(v.lazy(() => ReadNotificationSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileSchema)),
seasonalPromotion: v.nullish(v.lazy(() => ReadSeasonalPromotionSchema)),
products: v.nullish(v.lazy(() => ReadProductSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemSchema)),
isDeleted: v.nullish(comparable("bool")),
seasonalPromotionId: v.nullish(comparable("number")),
brandId: v.nullish(comparable("number"))})



export type TReadPromotionSchema = v.InferOutput<typeof ReadPromotionSchema>
export type TReadPromotionSchemaInput = v.InferInput<typeof ReadPromotionSchema>
