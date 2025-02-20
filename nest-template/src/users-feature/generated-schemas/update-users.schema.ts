import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateUsersSchema = v.pipe(
	v.object({ profile: v.nullish(v.union([v.object({ id: v.number() }), v.object({})])) }),
	v.metadata({ [modelSymbol]: 'UsersEntity', profile: 'ProfilesEntity' }),
);
export default UpdateUsersSchema;

export type TUpdateUsersSchemaInput = v.InferInput<typeof UpdateUsersSchema>;
export type TUpdateUsersSchemaOutput = v.InferOutput<typeof UpdateUsersSchema>;
