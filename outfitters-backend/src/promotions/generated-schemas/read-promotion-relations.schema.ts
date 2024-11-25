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
notifications?: ReadNotificationRelations | string | boolean | undefined;
brand?: ReadBrandProfileRelations | string | boolean | undefined;
seasonalPromotion?: ReadSeasonalPromotionRelations | string | boolean | undefined;
products?: ReadProductRelations | string | boolean | undefined;
orderItems?: ReadOrderItemRelations | string | boolean | undefined}

export const ReadPromotionRelationsSchema: v.GenericSchema<ReadPromotionRelations> = v.object({type: v.nullish(v.enum(PromotionTypeEnum)),
target: v.nullish(v.enum(PromotionTargetEnum)),
status: v.nullish(v.enum(PromotionStatusEnum)),
notifications: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadNotificationRelationsSchema)])),
brand: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandProfileRelationsSchema)])),
seasonalPromotion: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadSeasonalPromotionRelationsSchema)])),
products: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
orderItems: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadOrderItemRelationsSchema)]))})



export type TReadPromotionRelationsSchemaOutput = v.InferOutput<typeof ReadPromotionRelationsSchema>;
export type TReadPromotionRelationsSchemaInput = v.InferInput<typeof ReadPromotionRelationsSchema>;
