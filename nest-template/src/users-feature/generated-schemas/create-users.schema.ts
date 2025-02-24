import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateUsersSchema = v.pipe(
	v.object({
		username: v.pipe(v.string(), v.maxLength(50)),
		email: v.pipe(v.string(), v.maxLength(100)),
		password_hash: v.pipe(v.string(), v.maxLength(255)),
	}),
	v.metadata({ [modelSymbol]: 'UsersEntity' }),
);
export default CreateUsersSchema;

export type TCreateUsersSchemaInput = v.InferInput<typeof CreateUsersSchema>;
export type TCreateUsersSchemaOutput = v.InferOutput<typeof CreateUsersSchema>;
