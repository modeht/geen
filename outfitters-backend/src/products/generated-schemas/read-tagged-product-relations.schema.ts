import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadProductRelationsSchema, { ReadProductRelations } from './read-product-relations.schema';
import ReadPostRelationsSchema, { ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema';
import ReadStoryRelationsSchema, {
	ReadStoryRelations,
} from '../../stories/generated-schemas/read-story-relations.schema';
import ReadAffiliationLinkRelationsSchema, {
	ReadAffiliationLinkRelations,
} from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema';

export class ReadTaggedProductRelations {
	product?: ReadProductRelations | string | boolean;
	post?: ReadPostRelations | string | boolean;
	story?: ReadStoryRelations | string | boolean;
	affiliationLink?: ReadAffiliationLinkRelations | string | boolean;
}

const ReadTaggedProductRelationsSchema: v.GenericSchema<ReadTaggedProductRelations> = v.object({
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
	post: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPostRelationsSchema),
		]),
	),
	story: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadStoryRelationsSchema),
		]),
	),
	affiliationLink: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadAffiliationLinkRelationsSchema),
		]),
	),
});

export default ReadTaggedProductRelationsSchema;

export type TReadTaggedProductRelationsSchemaOutput = v.InferOutput<typeof ReadTaggedProductRelationsSchema>;
export type TReadTaggedProductRelationsSchemaInput = v.InferInput<typeof ReadTaggedProductRelationsSchema>;
