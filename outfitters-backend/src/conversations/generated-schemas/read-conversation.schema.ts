import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadMessageSchema, ReadMessageSchemaFilters } from '../../messages/generated-schemas/read-message.schema'

export class ReadConversationSchemaFilters {isSupport?: GenericComparable<"bool"> | null | undefined;
from?: ReadUserSchemaFilters | null | undefined;
to?: ReadUserSchemaFilters | null | undefined;
messages?: ReadMessageSchemaFilters | null | undefined;
archivedByFrom?: GenericComparable<"bool"> | null | undefined;
archivedByTo?: GenericComparable<"bool"> | null | undefined;
fromId?: GenericComparable<"number"> | null | undefined;
toId?: GenericComparable<"number"> | null | undefined;
isCollaboration?: GenericComparable<"bool"> | null | undefined}

export const ReadConversationSchema: v.GenericSchema<ReadConversationSchemaFilters> = v.object({isSupport: v.nullish(comparable("bool")),
from: v.nullish(v.lazy(() => ReadUserSchema)),
to: v.nullish(v.lazy(() => ReadUserSchema)),
messages: v.nullish(v.lazy(() => ReadMessageSchema)),
archivedByFrom: v.nullish(comparable("bool")),
archivedByTo: v.nullish(comparable("bool")),
fromId: v.nullish(comparable("number")),
toId: v.nullish(comparable("number")),
isCollaboration: v.nullish(comparable("bool"))})



export type TReadConversationSchema = v.InferOutput<typeof ReadConversationSchema>
export type TReadConversationSchemaInput = v.InferInput<typeof ReadConversationSchema>
