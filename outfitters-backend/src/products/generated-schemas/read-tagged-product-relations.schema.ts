import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductRelationsSchema, ReadProductRelations } from './read-product-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'



export class ReadTaggedProductRelations {product?: ReadProductRelations | string | boolean | undefined;
post?: ReadPostRelations | string | boolean | undefined;
story?: ReadStoryRelations | string | boolean | undefined;
affiliationLink?: ReadAffiliationLinkRelations | string | boolean | undefined}

export const ReadTaggedProductRelationsSchema: v.GenericSchema<ReadTaggedProductRelations> = v.object({product: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
post: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
story: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)])),
affiliationLink: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadAffiliationLinkRelationsSchema)]))})



export type TReadTaggedProductRelationsSchemaOutput = v.InferOutput<typeof ReadTaggedProductRelationsSchema>;
export type TReadTaggedProductRelationsSchemaInput = v.InferInput<typeof ReadTaggedProductRelationsSchema>;
