import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelationsSchemaRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelationsSchemaRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'

export class ReadNotificationRelationsSchemaRelations {user?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
collaboration?: ReadCollaborationRelationsSchemaRelations | boolean | null | undefined;
comment?: ReadCommentRelationsSchemaRelations | boolean | null | undefined;
promotion?: ReadPromotionRelationsSchemaRelations | boolean | null | undefined;
product?: ReadProductRelationsSchemaRelations | boolean | null | undefined}

export const ReadNotificationRelationsSchema: v.GenericSchema<ReadNotificationRelationsSchemaRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
collaboration: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollaborationRelationsSchema)])),
comment: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)])),
promotion: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadNotificationRelationsSchemaOutput = v.InferOutput<typeof ReadNotificationRelationsSchema>;
export type TReadNotificationRelationsSchemaInput = v.InferInput<typeof ReadNotificationRelationsSchema>;
