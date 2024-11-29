import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import ReadMessageRelationsSchema, { ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'



export class ReadConversationRelations {from?: ReadUserRelations | string | boolean | undefined;
to?: ReadUserRelations | string | boolean | undefined;
messages?: ReadMessageRelations | string | boolean | undefined}

const ReadConversationRelationsSchema: v.GenericSchema<ReadConversationRelations> = v.object({from: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
to: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
messages: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMessageRelationsSchema)]))});

export default ReadConversationRelationsSchema;




export type TReadConversationRelationsSchemaOutput = v.InferOutput<typeof ReadConversationRelationsSchema>;
export type TReadConversationRelationsSchemaInput = v.InferInput<typeof ReadConversationRelationsSchema>;
