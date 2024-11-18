import * as v from 'valibot';



export const CreateProductOptionValueSchema = v.pipe(v.object({value: v.string(),
optionName: v.string(),
productId: v.number(),
option: v.nullish(v.union([v.number(), v.object({name: v.string(),
productId: v.number()})])),
variants: v.nullish(v.union([v.array(v.number()), v.array(v.object({isArchived: v.boolean(),
stock: v.number(),
price: v.nullish(v.number()),
lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
sku: v.nullish(v.string()),
mainProductId: v.nullish(v.number())}))]))}),v.metadata({option: 'ProductOptionEntity',
variants: 'ProductVariantEntity'}))

export type TCreateProductOptionValueSchemaInput = v.InferInput<typeof CreateProductOptionValueSchema>;
export type TCreateProductOptionValueSchemaOutput = v.InferOutput<typeof CreateProductOptionValueSchema>;
