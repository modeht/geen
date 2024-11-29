import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import ReadMediaRelationsSchema, { ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import ReadCollaborationRelationsSchema, { ReadCollaborationRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import ReadPostRelationsSchema, { ReadPostRelations } from '../../posts/generated-schemas/read-post-relations.schema'
import ReadStoryRelationsSchema, { ReadStoryRelations } from '../../stories/generated-schemas/read-story-relations.schema'
import ReadProductRelationsSchema, { ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import ReadConversationRelationsSchema, { ReadConversationRelations } from '../../conversations/generated-schemas/read-conversation-relations.schema'
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import ReadCommentRelationsSchema, { ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'



export class ReadMessageRelations {media?: ReadMediaRelations | string | boolean | undefined;
collaboration?: ReadCollaborationRelations | string | boolean | undefined;
post?: ReadPostRelations | string | boolean | undefined;
story?: ReadStoryRelations | string | boolean | undefined;
product?: ReadProductRelations | string | boolean | undefined;
conversation?: ReadConversationRelations | string | boolean | undefined;
from?: ReadUserRelations | string | boolean | undefined;
to?: ReadUserRelations | string | boolean | undefined;
comment?: ReadCommentRelations | string | boolean | undefined}

const ReadMessageRelationsSchema: v.GenericSchema<ReadMessageRelations> = v.object({media: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
collaboration: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCollaborationRelationsSchema)])),
post: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPostRelationsSchema)])),
story: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadStoryRelationsSchema)])),
product: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
conversation: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadConversationRelationsSchema)])),
from: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
to: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
comment: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCommentRelationsSchema)]))});

export default ReadMessageRelationsSchema;




export type TReadMessageRelationsSchemaOutput = v.InferOutput<typeof ReadMessageRelationsSchema>;
export type TReadMessageRelationsSchemaInput = v.InferInput<typeof ReadMessageRelationsSchema>;
