import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateUsersSchema = v.pipe(
	v.object({ profiles: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({}))])) }),
	v.metadata({ [modelSymbol]: 'UsersEntity', profiles: 'ProfilesEntity' }),
);
export default UpdateUsersSchema;

export type TUpdateUsersSchemaInput = v.InferInput<typeof UpdateUsersSchema>;
export type TUpdateUsersSchemaOutput = v.InferOutput<typeof UpdateUsersSchema>;
