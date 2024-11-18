import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'



export class ReadCommentRelations {commentor?: ReadUserRelations | boolean | null | undefined;
post?: ReadPostRelations | boolean | null | undefined;
notifications?: ReadNotificationRelations | boolean | null | undefined;
messages?: ReadMessageRelations | boolean | null | undefined}

export const ReadCommentRelationsSchema: v.GenericSchema<ReadCommentRelations> = v.object({commentor: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
notifications: v.nullish(v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)])),
messages: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]))})



export type TReadCommentRelationsSchemaOutput = v.InferOutput<typeof ReadCommentRelationsSchema>;
export type TReadCommentRelationsSchemaInput = v.InferInput<typeof ReadCommentRelationsSchema>;
