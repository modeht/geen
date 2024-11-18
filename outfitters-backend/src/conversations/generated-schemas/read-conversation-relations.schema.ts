import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'



export class ReadConversationRelations {from?: ReadUserRelations | boolean | null | undefined;
to?: ReadUserRelations | boolean | null | undefined;
messages?: ReadMessageRelations | boolean | null | undefined}

export const ReadConversationRelationsSchema: v.GenericSchema<ReadConversationRelations> = v.object({from: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
to: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
messages: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]))})



export type TReadConversationRelationsSchemaOutput = v.InferOutput<typeof ReadConversationRelationsSchema>;
export type TReadConversationRelationsSchemaInput = v.InferInput<typeof ReadConversationRelationsSchema>;
