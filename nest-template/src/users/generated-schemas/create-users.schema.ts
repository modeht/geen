import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateUsersSchema = v.pipe(v.object({}), v.metadata({ [modelSymbol]: 'UsersEntity' }));
export default CreateUsersSchema;

export type TCreateUsersSchemaInput = v.InferInput<typeof CreateUsersSchema>;
export type TCreateUsersSchemaOutput = v.InferOutput<typeof CreateUsersSchema>;
