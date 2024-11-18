import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from './read-product-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelationsSchemaRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelationsSchemaRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadAffiliationLinkRelationsSchema, ReadAffiliationLinkRelationsSchemaRelations } from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema'

export class ReadTaggedProductRelationsSchemaRelations {product?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
post?: ReadPostRelationsSchemaRelations | boolean | null | undefined;
story?: ReadStoryRelationsSchemaRelations | boolean | null | undefined;
affiliationLink?: ReadAffiliationLinkRelationsSchemaRelations | boolean | null | undefined}

export const ReadTaggedProductRelationsSchema: v.GenericSchema<ReadTaggedProductRelationsSchemaRelations> = v.object({product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
story: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
affiliationLink: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkRelationsSchema)]))})



export type TReadTaggedProductRelationsSchemaOutput = v.InferOutput<typeof ReadTaggedProductRelationsSchema>;
export type TReadTaggedProductRelationsSchemaInput = v.InferInput<typeof ReadTaggedProductRelationsSchema>;
