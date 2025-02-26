import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadProductsRelationsSchema, {
	ReadProductsRelations,
} from '../../products-feature/generated-schemas/read-products-relations.schema';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';

export class ReadReviewsRelations {
	review_product?: ReadProductsRelations | string | boolean;
	review_user?: ReadUsersRelations | string | boolean;
}

const ReadReviewsRelationsSchema: v.GenericSchema<ReadReviewsRelations> = v.object({
	review_product: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductsRelationsSchema),
		]),
	),
	review_user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUsersRelationsSchema),
		]),
	),
});

export default ReadReviewsRelationsSchema;

export type TReadReviewsRelationsSchemaOutput = v.InferOutput<typeof ReadReviewsRelationsSchema>;
export type TReadReviewsRelationsSchemaInput = v.InferInput<typeof ReadReviewsRelationsSchema>;
