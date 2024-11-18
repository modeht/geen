import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelationsSchemaRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelationsSchemaRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelationsSchemaRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadConversationRelationsSchema, ReadConversationRelationsSchemaRelations } from '../../conversations/generated-schemas/read-conversation-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelationsSchemaRelations } from '../../comments/generated-schemas/read-comment-relations.schema'

export class ReadMessageRelationsSchemaRelations {media?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
collaboration?: ReadCollaborationRelationsSchemaRelations | boolean | null | undefined;
post?: ReadPostRelationsSchemaRelations | boolean | null | undefined;
story?: ReadStoryRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
conversation?: ReadConversationRelationsSchemaRelations | boolean | null | undefined;
from?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
to?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
comment?: ReadCommentRelationsSchemaRelations | boolean | null | undefined}

export const ReadMessageRelationsSchema: v.GenericSchema<ReadMessageRelationsSchemaRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
collaboration: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollaborationRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
story: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
conversation: v.nullish(v.union([v.boolean(), v.lazy(() => ReadConversationRelationsSchema)])),
from: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
to: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
comment: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)]))})



export type TReadMessageRelationsSchema = v.InferOutput<typeof ReadMessageRelationsSchema>;

export type TReadMessageRelationsSchemaInput = v.InferInput<typeof ReadMessageRelationsSchema>;
