import * as v from 'valibot';

export const CreateSeasonalPromotionSchema = v.pipe(v.object({title: v.string(),
start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
promotions: v.nullish(v.union([v.array(v.number()), v.array(v.object({title: v.string(),
discountPercentage: v.number(),
minPurchaseAmount: v.nullish(v.number()),
start: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
end: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
isDeleted: v.boolean(),
seasonalPromotionId: v.nullish(v.number()),
brandId: v.number()}))])),
subCategories: v.nullish(v.union([v.array(v.number()), v.array(v.object({name: v.string(),
isArchived: v.boolean(),
superCategoryId: v.nullish(v.number())}))]))}),v.metadata({promotions: 'PromotionEntity',
subCategories: 'CategoryEntity'}))

export type TCreateSeasonalPromotionSchema = v.InferInput<typeof CreateSeasonalPromotionSchema>
