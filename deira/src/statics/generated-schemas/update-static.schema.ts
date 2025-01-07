import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

const UpdateStaticSchema = v.pipe(
	v.object({
		whatsapp: v.optional(v.string()),
		email: v.optional(v.string()),
		phoneNumber: v.nullish(v.string()),
		facebook: v.nullish(v.string()),
		instagram: v.nullish(v.string()),
		x: v.nullish(v.string()),
	}),
	v.metadata({ [modelSymbol]: 'StaticEntity' }),
);
export default UpdateStaticSchema;

export type TUpdateStaticSchemaInput = v.InferInput<typeof UpdateStaticSchema>;
export type TUpdateStaticSchemaOutput = v.InferOutput<typeof UpdateStaticSchema>;
