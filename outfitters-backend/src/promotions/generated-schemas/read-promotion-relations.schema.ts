import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadNotificationRelationsSchema, ReadNotificationRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadSeasonalPromotionRelationsSchema, ReadSeasonalPromotionRelations } from './read-seasonal-promotion-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadOrderItemRelationsSchema, ReadOrderItemRelations } from '../../orders/generated-schemas/read-order-item-relations.schema'


import { PromotionTypeEnum } from '../entities/enums'
import { PromotionTargetEnum } from '../entities/enums'
import { PromotionStatusEnum } from '../entities/enums'
export class ReadPromotionRelations {type?: PromotionTypeEnum | null | undefined;
target?: PromotionTargetEnum | null | undefined;
status?: PromotionStatusEnum | null | undefined;
notifications?: ReadNotificationRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelations | boolean | null | undefined;
seasonalPromotion?: ReadSeasonalPromotionRelations | boolean | null | undefined;
products?: ReadProductRelations | boolean | null | undefined;
orderItems?: ReadOrderItemRelations | boolean | null | undefined}

export const ReadPromotionRelationsSchema: v.GenericSchema<ReadPromotionRelations> = v.object({type: v.nullish(v.enum(PromotionTypeEnum)),
target: v.nullish(v.enum(PromotionTargetEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
notifications: v.nullish(v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
seasonalPromotion: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSeasonalPromotionRelationsSchema)])),
products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
orderItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)]))})



export type TReadPromotionRelationsSchemaOutput = v.InferOutput<typeof ReadPromotionRelationsSchema>;
export type TReadPromotionRelationsSchemaInput = v.InferInput<typeof ReadPromotionRelationsSchema>;
