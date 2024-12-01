import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';



export const UpdateProductOptionValueSchema = v.pipe(v.object({value: v.optional(v.string()),
optionName: v.optional(v.string()),
productId: v.optional(v.number()),
option: v.nullish(v.union([v.object({ id: v.number() }), v.object({name: v.string(),
productId: v.number()})])),
variants: v.nullish(v.union([v.array(v.object({isArchived: v.boolean(),
stock: v.number(),
price: v.nullish(v.number()),
lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
sku: v.nullish(v.string()),
mainProductId: v.nullish(v.number())}))]))}),v.metadata({[modelSymbol]: 'ProductOptionValueEntity',
option: 'ProductOptionEntity',
variants: 'ProductVariantEntity'}))

export type TUpdateProductOptionValueSchemaInput = v.InferInput<typeof UpdateProductOptionValueSchema>;
export type TUpdateProductOptionValueSchemaOutput = v.InferOutput<typeof UpdateProductOptionValueSchema>;
