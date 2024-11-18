import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductRelationsSchema, ReadProductRelations } from './read-product-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'



export class ReadTaggedProductRelations {product?: ReadProductRelations | boolean | null | undefined;
post?: ReadPostRelations | boolean | null | undefined;
story?: ReadStoryRelations | boolean | null | undefined;
affiliationLink?: ReadAffiliationLinkRelations | boolean | null | undefined}

export const ReadTaggedProductRelationsSchema: v.GenericSchema<ReadTaggedProductRelations> = v.object({product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
story: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
affiliationLink: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)]))})



export type TReadTaggedProductRelationsSchemaOutput = v.InferOutput<typeof ReadTaggedProductRelationsSchema>;
export type TReadTaggedProductRelationsSchemaInput = v.InferInput<typeof ReadTaggedProductRelationsSchema>;
