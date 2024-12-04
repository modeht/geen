import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadProductFiltersSchema, { ReadProductFiltersSchemaFilters } from './read-product-filters.schema'
import ReadPostFiltersSchema, { ReadPostFiltersSchemaFilters } from '../../posts/generated-schemas/read-post-filters.schema'
import ReadStoryFiltersSchema, { ReadStoryFiltersSchemaFilters } from '../../stories/generated-schemas/read-story-filters.schema'
import ReadAffiliationLinkFiltersSchema, { ReadAffiliationLinkFiltersSchemaFilters } from '../../affiliation-links/generated-schemas/read-affiliation-link-filters.schema'



export class ReadTaggedProductFiltersSchemaFilters {product?: ReadProductFiltersSchemaFilters | null;
post?: ReadPostFiltersSchemaFilters | null;
story?: ReadStoryFiltersSchemaFilters | null;
affiliationLink?: ReadAffiliationLinkFiltersSchemaFilters | null;
productId?: GenericComparable<"number"> | null;
postId?: GenericComparable<"number"> | null;
storyId?: GenericComparable<"number"> | null;
affiliationLinkId?: GenericComparable<"number"> | null}

const ReadTaggedProductFiltersSchema: v.GenericSchema<ReadTaggedProductFiltersSchemaFilters> = v.object({product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
story: v.nullish(v.lazy(() => ReadStoryFiltersSchema)),
affiliationLink: v.nullish(v.lazy(() => ReadAffiliationLinkFiltersSchema)),
productId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
storyId: v.nullish(comparable("number")),
affiliationLinkId: v.nullish(comparable("number"))});

export default ReadTaggedProductFiltersSchema;




export type TReadTaggedProductFiltersSchemaOutput = v.InferOutput<typeof ReadTaggedProductFiltersSchema>;
export type TReadTaggedProductFiltersSchemaInput = v.InferInput<typeof ReadTaggedProductFiltersSchema>;
