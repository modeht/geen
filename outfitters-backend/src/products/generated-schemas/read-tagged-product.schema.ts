import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductSchema, ReadProductSchemaFilters } from './read-product.schema'
import { ReadPostSchema, ReadPostSchemaFilters } from '../../posts/generated-schemas/read-post.schema'
import { ReadStorySchema, ReadStorySchemaFilters } from '../../stories/generated-schemas/read-story.schema'
import { ReadAffiliationLinkSchema, ReadAffiliationLinkSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link.schema'

export class ReadTaggedProductSchemaFilters {product?: ReadProductSchemaFilters | null | undefined;
post?: ReadPostSchemaFilters | null | undefined;
story?: ReadStorySchemaFilters | null | undefined;
affiliationLink?: ReadAffiliationLinkSchemaFilters | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined;
storyId?: GenericComparable<"number"> | null | undefined;
affiliationLinkId?: GenericComparable<"number"> | null | undefined}

export const ReadTaggedProductSchema: v.GenericSchema<ReadTaggedProductSchemaFilters> = v.object({product: v.nullish(v.lazy(() => ReadProductSchema)),
post: v.nullish(v.lazy(() => ReadPostSchema)),
story: v.nullish(v.lazy(() => ReadStorySchema)),
affiliationLink: v.nullish(v.lazy(() => ReadAffiliationLinkSchema)),
productId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
storyId: v.nullish(comparable("number")),
affiliationLinkId: v.nullish(comparable("number"))})



export type TReadTaggedProductSchema = v.InferOutput<typeof ReadTaggedProductSchema>
export type TReadTaggedProductSchemaInput = v.InferInput<typeof ReadTaggedProductSchema>
