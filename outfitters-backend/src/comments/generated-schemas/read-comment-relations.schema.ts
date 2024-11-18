import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelationsSchemaRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadNotificationRelationsSchema, ReadNotificationRelationsSchemaRelations } from '../../notifications/generated-schemas/read-notification-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelationsSchemaRelations } from '../../messages/generated-schemas/read-message-relations.schema'

export class ReadCommentRelationsSchemaRelations {commentor?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
post?: ReadPostRelationsSchemaRelations | boolean | null | undefined;
notifications?: ReadNotificationRelationsSchemaRelations | boolean | null | undefined;
messages?: ReadMessageRelationsSchemaRelations | boolean | null | undefined}

export const ReadCommentRelationsSchema: v.GenericSchema<ReadCommentRelationsSchemaRelations> = v.object({commentor: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
notifications: v.nullish(v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)])),
messages: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)]))})



export type TReadCommentRelationsSchema = v.InferOutput<typeof ReadCommentRelationsSchema>;

export type TReadCommentRelationsSchemaInput = v.InferInput<typeof ReadCommentRelationsSchema>;
