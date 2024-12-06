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
		brands: v.nullish(
			v.union([
				v.array(
					v.object({
						storeName: v.nullish(v.string()),
						brandName: v.nullish(v.string()),
						storeBio: v.nullish(v.string()),
						website: v.nullish(v.string()),
						isPublished: v.boolean(),
						shippingCost: v.nullish(v.number()),
						currency: v.nullish(v.string()),
						brandManagerFullName: v.nullish(v.string()),
						logoId: v.nullish(v.number()),
						isFollowing: v.nullish(v.boolean()),
						hasStory: v.nullish(v.boolean()),
						followersCount: v.nullish(v.number()),
						followingCount: v.nullish(v.number()),
						postsCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		iconId: v.number(),
	}),
	v.metadata({ [modelSymbol]: 'CountryEntity', icon: 'MediaEntity', brands: 'BrandProfileEntity' }),
);
export default CreateCountrySchema;

export type TCreateCountrySchemaInput = v.InferInput<typeof CreateCountrySchema>;
export type TCreateCountrySchemaOutput = v.InferOutput<typeof CreateCountrySchema>;
