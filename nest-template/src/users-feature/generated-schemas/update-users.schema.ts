import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateUsersSchema = v.pipe(
	v.object({
		username: v.optional(v.pipe(v.string(), v.maxLength(50))),
		email: v.optional(v.pipe(v.string(), v.maxLength(100))),
		password_hash: v.optional(v.pipe(v.string(), v.maxLength(255))),
	}),
	v.metadata({ [modelSymbol]: 'UsersEntity' }),
);
export default UpdateUsersSchema;

export type TUpdateUsersSchemaInput = v.InferInput<typeof UpdateUsersSchema>;
export type TUpdateUsersSchemaOutput = v.InferOutput<typeof UpdateUsersSchema>;
