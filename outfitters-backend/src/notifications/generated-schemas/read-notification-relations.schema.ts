import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'



export class ReadNotificationRelations {type?: NotificationType | null | undefined;
user?: ReadUserRelations | boolean | null | undefined;
collaboration?: ReadCollaborationRelations | boolean | null | undefined;
comment?: ReadCommentRelations | boolean | null | undefined;
promotion?: ReadPromotionRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined}

export const ReadNotificationRelationsSchema: v.GenericSchema<ReadNotificationRelations> = v.object({type: v.nullish(v.enum(NotificationType)),
user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
collaboration: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollaborationRelationsSchema)])),
comment: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)])),
promotion: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadNotificationRelationsSchemaOutput = v.InferOutput<typeof ReadNotificationRelationsSchema>;
export type TReadNotificationRelationsSchemaInput = v.InferInput<typeof ReadNotificationRelationsSchema>;
