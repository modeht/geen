import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import { ReadUserSchema, ReadUserSchemaFilters } from '../../users/generated-schemas/read-user.schema'
import { ReadCollaborationSchema, ReadCollaborationSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration.schema'
import { ReadCommentSchema, ReadCommentSchemaFilters } from '../../comments/generated-schemas/read-comment.schema'
import { ReadPromotionSchema, ReadPromotionSchemaFilters } from '../../promotions/generated-schemas/read-promotion.schema'
import { ReadProductSchema, ReadProductSchemaFilters } from '../../products/generated-schemas/read-product.schema'

export class ReadNotificationSchemaFilters {customContent?: GenericComparable<"string"> | null | undefined;
isRead?: GenericComparable<"bool"> | null | undefined;
user?: ReadUserSchemaFilters | null | undefined;
collaboration?: ReadCollaborationSchemaFilters | null | undefined;
comment?: ReadCommentSchemaFilters | null | undefined;
promotion?: ReadPromotionSchemaFilters | null | undefined;
product?: ReadProductSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined;
collaborationId?: GenericComparable<"number"> | null | undefined;
commentId?: GenericComparable<"number"> | null | undefined;
promotionId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined}

export const ReadNotificationSchema: v.GenericSchema<ReadNotificationSchemaFilters> = v.object({customContent: v.nullish(comparable("string")),
isRead: v.nullish(comparable("bool")),
user: v.nullish(v.lazy(() => ReadUserSchema)),
collaboration: v.nullish(v.lazy(() => ReadCollaborationSchema)),
comment: v.nullish(v.lazy(() => ReadCommentSchema)),
promotion: v.nullish(v.lazy(() => ReadPromotionSchema)),
product: v.nullish(v.lazy(() => ReadProductSchema)),
userId: v.nullish(comparable("number")),
collaborationId: v.nullish(comparable("number")),
commentId: v.nullish(comparable("number")),
promotionId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number"))})



export type TReadNotificationSchema = v.InferOutput<typeof ReadNotificationSchema>
export type TReadNotificationSchemaInput = v.InferInput<typeof ReadNotificationSchema>
