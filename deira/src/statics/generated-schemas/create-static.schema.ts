import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const CreateStaticSchema = v.pipe(
	v.object({
		whatsapp: v.string(),
		email: v.string(),
		phoneNumber: v.nullish(v.string()),
		facebook: v.nullish(v.string()),
		instagram: v.nullish(v.string()),
		x: v.nullish(v.string()),
	}),
	v.metadata({ [modelSymbol]: 'StaticEntity' }),
);
export default CreateStaticSchema;

export type TCreateStaticSchemaInput = v.InferInput<typeof CreateStaticSchema>;
export type TCreateStaticSchemaOutput = v.InferOutput<typeof CreateStaticSchema>;
