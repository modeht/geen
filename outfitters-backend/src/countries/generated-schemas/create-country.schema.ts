import { modelSymbol } from '../../globals/constants/schema-symbols';
import * as v from 'valibot';

const CreateCountrySchema = v.pipe(
	v.object({
		name: v.string(),
		code: v.string(),
		dialCode: v.string(),
		isSupported: v.boolean(),
		icon: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					mimetype: v.nullish(v.string()),
					url: v.nullish(v.string()),
					size: v.nullish(v.number()),
					width: v.nullish(v.number()),
					height: v.nullish(v.number()),
				}),
			]),
		),
		brands: v.any(),
		iconId: v.number(),
	}),
	v.metadata({ [modelSymbol]: 'CountryEntity', icon: 'MediaEntity' }),
);
export default CreateCountrySchema;

export type TCreateCountrySchemaInput = v.InferInput<typeof CreateCountrySchema>;
export type TCreateCountrySchemaOutput = v.InferOutput<typeof CreateCountrySchema>;
