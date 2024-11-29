import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import ReadCollaborationRelationsSchema, { ReadCollaborationRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import ReadCommentRelationsSchema, { ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import ReadPromotionRelationsSchema, { ReadPromotionRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import ReadProductRelationsSchema, { ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'



export class ReadNotificationRelations {type?: NotificationType | null | undefined;
user?: ReadUserRelations | string | boolean | undefined;
collaboration?: ReadCollaborationRelations | string | boolean | undefined;
comment?: ReadCommentRelations | string | boolean | undefined;
promotion?: ReadPromotionRelations | string | boolean | undefined;
product?: ReadProductRelations | string | boolean | undefined}

const ReadNotificationRelationsSchema: v.GenericSchema<ReadNotificationRelations> = v.object({type: v.nullish(v.enum(NotificationType)),
user: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
collaboration: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCollaborationRelationsSchema)])),
comment: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCommentRelationsSchema)])),
promotion: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPromotionRelationsSchema)])),
product: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)]))});

export default ReadNotificationRelationsSchema;




export type TReadNotificationRelationsSchemaOutput = v.InferOutput<typeof ReadNotificationRelationsSchema>;
export type TReadNotificationRelationsSchemaInput = v.InferInput<typeof ReadNotificationRelationsSchema>;
