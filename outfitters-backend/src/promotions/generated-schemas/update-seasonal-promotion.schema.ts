import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';


import { PromotionStatusEnum } from '../entities/enums'
import { PromotionTypeEnum } from '../entities/enums'
import { PromotionTargetEnum } from '../entities/enums'
const UpdateSeasonalPromotionSchema = v.pipe(v.object({title: v.optional(v.string()),
start: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
end: v.optional(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
status: v.optional(v.enum(PromotionStatusEnum)),
promotions: v.nullish(v.union([v.array(v.object({id:v.number()})), v.array(v.object({title: v.string(),
type: v.enum(PromotionTypeEnum),
discountPercentage: v.number(),
minPurchaseAmount: v.nullish(v.number()),
start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
target: v.enum(PromotionTargetEnum),
status: v.enum(PromotionStatusEnum),
isDeleted: v.boolean(),
seasonalPromotionId: v.nullish(v.number()),
brandId: v.number()}))])),
subCategories: v.nullish(v.union([v.array(v.object({name: v.string(),
isArchived: v.boolean(),
superCategoryId: v.nullish(v.number())}))]))}),v.metadata({[modelSymbol]: 'SeasonalPromotionEntity',
promotions: 'PromotionEntity',
subCategories: 'CategoryEntity'}));
export default UpdateSeasonalPromotionSchema;

export type TUpdateSeasonalPromotionSchemaInput = v.InferInput<typeof UpdateSeasonalPromotionSchema>;
export type TUpdateSeasonalPromotionSchemaOutput = v.InferOutput<typeof UpdateSeasonalPromotionSchema>;
