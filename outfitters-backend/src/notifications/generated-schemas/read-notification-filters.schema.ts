import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import { ReadUserFiltersSchema, ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'
import { ReadCollaborationFiltersSchema, ReadCollaborationFiltersSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration-filters.schema'
import { ReadCommentFiltersSchema, ReadCommentFiltersSchemaFilters } from '../../comments/generated-schemas/read-comment-filters.schema'
import { ReadPromotionFiltersSchema, ReadPromotionFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promotion-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'



export class ReadNotificationFiltersSchemaFilters {type?: NotificationType | null | undefined;
customContent?: GenericComparable<"string"> | null | undefined;
isRead?: GenericComparable<"bool"> | null | undefined;
user?: ReadUserFiltersSchemaFilters | null | undefined;
collaboration?: ReadCollaborationFiltersSchemaFilters | null | undefined;
comment?: ReadCommentFiltersSchemaFilters | null | undefined;
promotion?: ReadPromotionFiltersSchemaFilters | null | undefined;
product?: ReadProductFiltersSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined;
collaborationId?: GenericComparable<"number"> | null | undefined;
commentId?: GenericComparable<"number"> | null | undefined;
promotionId?: GenericComparable<"number"> | null | undefined;
productId?: GenericComparable<"number"> | null | undefined}

export const ReadNotificationFiltersSchema: v.GenericSchema<ReadNotificationFiltersSchemaFilters> = v.object({type: v.nullish(v.enum(NotificationType)),
customContent: v.nullish(comparable("string")),
isRead: v.nullish(comparable("bool")),
user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
collaboration: v.nullish(v.lazy(() => ReadCollaborationFiltersSchema)),
comment: v.nullish(v.lazy(() => ReadCommentFiltersSchema)),
promotion: v.nullish(v.lazy(() => ReadPromotionFiltersSchema)),
product: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
userId: v.nullish(comparable("number")),
collaborationId: v.nullish(comparable("number")),
commentId: v.nullish(comparable("number")),
promotionId: v.nullish(comparable("number")),
productId: v.nullish(comparable("number"))})



export type TReadNotificationFiltersSchemaOutput = v.InferOutput<typeof ReadNotificationFiltersSchema>;
export type TReadNotificationFiltersSchemaInput = v.InferInput<typeof ReadNotificationFiltersSchema>;
