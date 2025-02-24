import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateProductsSchema = v.pipe(
	v.object({
		seller_id: v.nullish(
			v.union([v.object({ id: v.number() }), v.object({ store_name: v.pipe(v.string(), v.maxLength(100)) })]),
		),
		name: v.pipe(v.string(), v.maxLength(100)),
		description: v.nullish(v.string()),
		price: v.number(),
		inventory_count: v.number(),
	}),
	v.metadata({ [modelSymbol]: 'ProductsEntity', seller_id: 'SellersEntity' }),
);
export default CreateProductsSchema;

export type TCreateProductsSchemaInput = v.InferInput<typeof CreateProductsSchema>;
export type TCreateProductsSchemaOutput = v.InferOutput<typeof CreateProductsSchema>;
