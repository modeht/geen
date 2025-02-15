import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateUsersSchema = v.pipe(
	v.object({ name: v.optional(v.pipe(v.string(), v.maxLength(255))) }),
	v.metadata({ [modelSymbol]: 'UsersEntity' }),
);
export default UpdateUsersSchema;

export type TUpdateUsersSchemaInput = v.InferInput<typeof UpdateUsersSchema>;
export type TUpdateUsersSchemaOutput = v.InferOutput<typeof UpdateUsersSchema>;
