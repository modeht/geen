import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateUsersSchema = v.pipe(
	v.object({ profile: v.nullish(v.union([v.object({ id: v.number() }), v.object({})])) }),
	v.metadata({ [modelSymbol]: 'UsersEntity', profile: 'ProfilesEntity' }),
);
export default CreateUsersSchema;

export type TCreateUsersSchemaInput = v.InferInput<typeof CreateUsersSchema>;
export type TCreateUsersSchemaOutput = v.InferOutput<typeof CreateUsersSchema>;
