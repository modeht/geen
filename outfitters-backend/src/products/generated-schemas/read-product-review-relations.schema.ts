import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadShopperProfileRelationsSchema, {
	ReadShopperProfileRelations,
} from '../../users/generated-schemas/read-shopper-profile-relations.schema';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadProductRelationsSchema, { ReadProductRelations } from './read-product-relations.schema';

export class ReadProductReviewRelations {
	shopperProfile?: ReadShopperProfileRelations | string | boolean;
	media?: ReadMediaRelations | string | boolean;
	product?: ReadProductRelations | string | boolean;
}

const ReadProductReviewRelationsSchema: v.GenericSchema<ReadProductReviewRelations> = v.object({
	shopperProfile: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadShopperProfileRelationsSchema),
		]),
	),
	media: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
	product: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductRelationsSchema),
		]),
	),
});

export default ReadProductReviewRelationsSchema;

export type TReadProductReviewRelationsSchemaOutput = v.InferOutput<typeof ReadProductReviewRelationsSchema>;
export type TReadProductReviewRelationsSchemaInput = v.InferInput<typeof ReadProductReviewRelationsSchema>;
