import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateUsersSchema = v.pipe(
	v.object({ profiles: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({}))])) }),
	v.metadata({ [modelSymbol]: 'UsersEntity', profiles: 'ProfilesEntity' }),
);
export default CreateUsersSchema;

export type TCreateUsersSchemaInput = v.InferInput<typeof CreateUsersSchema>;
export type TCreateUsersSchemaOutput = v.InferOutput<typeof CreateUsersSchema>;
