import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateSellersSchema = v.pipe(
	v.object({
		user_id: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					username: v.pipe(v.string(), v.maxLength(50)),
					email: v.pipe(v.string(), v.maxLength(100)),
					password_hash: v.pipe(v.string(), v.maxLength(255)),
				}),
			]),
		),
		store_name: v.pipe(v.string(), v.maxLength(100)),
	}),
	v.metadata({ [modelSymbol]: 'SellersEntity', user_id: 'UsersEntity' }),
);
export default CreateSellersSchema;

export type TCreateSellersSchemaInput = v.InferInput<typeof CreateSellersSchema>;
export type TCreateSellersSchemaOutput = v.InferOutput<typeof CreateSellersSchema>;
