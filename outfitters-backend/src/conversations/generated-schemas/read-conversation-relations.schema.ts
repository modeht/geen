import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'

export class ReadConversationRelationsSchemaRelations {from?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
to?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
messages?: ReadMessageRelationsSchemaRelations | boolean | null | undefined}

export const ReadConversationRelationsSchema: v.GenericSchema<ReadConversationRelationsSchemaRelations> = v.object({from: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
to: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
messages: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]))})



export type TReadConversationRelationsSchema = v.InferOutput<typeof ReadConversationRelationsSchema>;

export type TReadConversationRelationsSchemaInput = v.InferInput<typeof ReadConversationRelationsSchema>;
