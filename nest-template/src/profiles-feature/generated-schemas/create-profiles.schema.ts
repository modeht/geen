import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateProfilesSchema = v.pipe(
	v.object({ user: v.nullish(v.union([v.object({ id: v.number() }), v.object({})])) }),
	v.metadata({ [modelSymbol]: 'ProfilesEntity', user: 'UsersEntity' }),
);
export default CreateProfilesSchema;

export type TCreateProfilesSchemaInput = v.InferInput<typeof CreateProfilesSchema>;
export type TCreateProfilesSchemaOutput = v.InferOutput<typeof CreateProfilesSchema>;
