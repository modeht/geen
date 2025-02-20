import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateProfilesSchema = v.pipe(
	v.object({ user: v.nullish(v.union([v.object({ id: v.number() }), v.object({})])) }),
	v.metadata({ [modelSymbol]: 'ProfilesEntity', user: 'UsersEntity' }),
);
export default UpdateProfilesSchema;

export type TUpdateProfilesSchemaInput = v.InferInput<typeof UpdateProfilesSchema>;
export type TUpdateProfilesSchemaOutput = v.InferOutput<typeof UpdateProfilesSchema>;
