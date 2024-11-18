import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadSavedCollectionFiltersSchema, ReadSavedCollectionFiltersSchemaFilters } from './read-saved-collection-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import { ReadPostFiltersSchema, ReadPostFiltersSchemaFilters } from '../../posts/generated-schemas/read-post-filters.schema'



export class ReadSavedCollectionItemFiltersSchemaFilters {savedCollection?: ReadSavedCollectionFiltersSchemaFilters | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
post?: ReadPostFiltersSchemaFilters | null | undefined;
savedCollectionId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined;
postId?: GenericComparable<"number"> | null | undefined;
userId?: GenericComparable<"number"> | null | undefined}

export const ReadSavedCollectionItemFiltersSchema: v.GenericSchema<ReadSavedCollectionItemFiltersSchemaFilters> = v.object({savedCollection: v.nullish(v.lazy(() => ReadSavedCollectionFiltersSchema)),
product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
post: v.nullish(v.lazy(() => ReadPostFiltersSchema)),
savedCollectionId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number")),
postId: v.nullish(comparable("number")),
userId: v.nullish(comparable("number"))})



export type TReadSavedCollectionItemFiltersSchemaOutput = v.InferOutput<typeof ReadSavedCollectionItemFiltersSchema>;
export type TReadSavedCollectionItemFiltersSchemaInput = v.InferInput<typeof ReadSavedCollectionItemFiltersSchema>;
