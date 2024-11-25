import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from './read-product-filters.schema'
import { ReadPostFiltersSchema, ReadPostFiltersSchemaFilters } from '../../posts/generated-schemas/read-post-filters.schema'
import { ReadStoryFiltersSchema, ReadStoryFiltersSchemaFilters } from '../../stories/generated-schemas/read-story-filters.schema'
import { ReadAffiliationLinkFiltersSchema, ReadAffiliationLinkFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-filters.schema'



export class ReadTaggedProductFiltersSchemaFilters {product?: ReadProductFiltersSchemaFilters | null | undefined;
post?: ReadPostFiltersSchemaFilters | null | undefined;
story?: ReadStoryFiltersSchemaFilters | null | undefined;
affiliationLink?: ReadAffiliationLinkFiltersSchemaFilters | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined;
storyId?: GenericComparable<"number"> | null | undefined;
affiliationLinkId?: GenericComparable<"number"> | null | undefined}

export const ReadTaggedProductFiltersSchema: v.GenericSchema<ReadTaggedProductFiltersSchemaFilters> = v.object({product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
story: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
affiliationLink: v.nullish(v.lazy(() => ReadAffiliationLinkFiltersSchema)),
productId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
storyId: v.nullish(comparable("number")),
affiliationLinkId: v.nullish(comparable("number"))})



export type TReadTaggedProductFiltersSchemaOutput = v.InferOutput<typeof ReadTaggedProductFiltersSchema>;
export type TReadTaggedProductFiltersSchemaInput = v.InferInput<typeof ReadTaggedProductFiltersSchema>;
