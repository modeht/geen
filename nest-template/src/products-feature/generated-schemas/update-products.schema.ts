import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateProductsSchema = v.pipe(
	v.object({
		seller_id: v.nullish(
			v.union([v.object({ id: v.number() }), v.object({ store_name: v.pipe(v.string(), v.maxLength(100)) })]),
		),
		name: v.optional(v.pipe(v.string(), v.maxLength(100))),
		description: v.nullish(v.string()),
		price: v.optional(v.number()),
		inventory_count: v.optional(v.number()),
	}),
	v.metadata({ [modelSymbol]: 'ProductsEntity', seller_id: 'SellersEntity' }),
);
export default UpdateProductsSchema;

export type TUpdateProductsSchemaInput = v.InferInput<typeof UpdateProductsSchema>;
export type TUpdateProductsSchemaOutput = v.InferOutput<typeof UpdateProductsSchema>;
