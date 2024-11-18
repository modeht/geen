import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadPostRelationsSchema, ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import { ReadStoryRelationsSchema, ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadConversationRelationsSchema, ReadConversationRelations } from '../../conversations/generated-schemas/read-conversation-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'



export class ReadMessageRelations {media?: ReadMediaRelations | boolean | null | undefined;
collaboration?: ReadCollaborationRelations | boolean | null | undefined;
post?: ReadPostRelations | boolean | null | undefined;
story?: ReadStoryRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined;
conversation?: ReadConversationRelations | boolean | null | undefined;
from?: ReadUserRelations | boolean | null | undefined;
to?: ReadUserRelations | boolean | null | undefined;
comment?: ReadCommentRelations | boolean | null | undefined}

export const ReadMessageRelationsSchema: v.GenericSchema<ReadMessageRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
collaboration: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollaborationRelationsSchema)])),
post: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostRelationsSchema)])),
story: v.nullish(v.union([v.boolean(), v.lazy(() => ReadStoryRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
conversation: v.nullish(v.union([v.boolean(), v.lazy(() => ReadConversationRelationsSchema)])),
from: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
to: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
comment: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)]))})



export type TReadMessageRelationsSchemaOutput = v.InferOutput<typeof ReadMessageRelationsSchema>;
export type TReadMessageRelationsSchemaInput = v.InferInput<typeof ReadMessageRelationsSchema>;
