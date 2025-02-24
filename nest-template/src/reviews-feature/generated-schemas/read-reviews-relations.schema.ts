import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import ReadUsersRelationsSchema, {
	ReadUsersRelations,
} from '../../users-feature/generated-schemas/read-users-relations.schema';
import ReadProductsRelationsSchema, {
	ReadProductsRelations,
} from '../../products-feature/generated-schemas/read-products-relations.schema';

export class ReadReviewsRelations {
	user_id?: ReadUsersRelations | string | boolean;
	product_id?: ReadProductsRelations | string | boolean;
}

const ReadReviewsRelationsSchema: v.GenericSchema<ReadReviewsRelations> = v.object({
	user_id: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUsersRelationsSchema),
		]),
	),
	product_id: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductsRelationsSchema),
		]),
	),
});

export default ReadReviewsRelationsSchema;

export type TReadReviewsRelationsSchemaOutput = v.InferOutput<typeof ReadReviewsRelationsSchema>;
export type TReadReviewsRelationsSchemaInput = v.InferInput<typeof ReadReviewsRelationsSchema>;
