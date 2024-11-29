import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadUserFiltersSchema, { ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'
import ReadMessageFiltersSchema, { ReadMessageFiltersSchemaFilters } from '../../messages/generated-schemas/read-message-filters.schema'



export class ReadConversationFiltersSchemaFilters {isSupport?: GenericComparable<"bool"> | null | undefined;
from?: ReadUserFiltersSchemaFilters | null | undefined;
to?: ReadUserFiltersSchemaFilters | null | undefined;
messages?: ReadMessageFiltersSchemaFilters | null | undefined;
archivedByFrom?: GenericComparable<"bool"> | null | undefined;
archivedByTo?: GenericComparable<"bool"> | null | undefined;
fromId?: GenericComparable<"number"> | null | undefined;
toId?: GenericComparable<"number"> | null | undefined;
isCollaboration?: GenericComparable<"bool"> | null | undefined}

const ReadConversationFiltersSchema: v.GenericSchema<ReadConversationFiltersSchemaFilters> = v.object({isSupport: v.nullish(comparable("bool")),
from: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
to: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
messages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
archivedByFrom: v.nullish(comparable("bool")),
archivedByTo: v.nullish(comparable("bool")),
fromId: v.nullish(comparable("number")),
toId: v.nullish(comparable("number")),
isCollaboration: v.nullish(comparable("bool"))});

export default ReadConversationFiltersSchema;




export type TReadConversationFiltersSchemaOutput = v.InferOutput<typeof ReadConversationFiltersSchema>;
export type TReadConversationFiltersSchemaInput = v.InferInput<typeof ReadConversationFiltersSchema>;
