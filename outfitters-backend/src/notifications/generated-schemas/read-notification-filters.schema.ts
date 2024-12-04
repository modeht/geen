import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import ReadUserFiltersSchema, { ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'
import ReadCollaborationFiltersSchema, { ReadCollaborationFiltersSchemaFilters } from '../../collaborations/generated-schemas/read-collaboration-filters.schema'
import ReadCommentFiltersSchema, { ReadCommentFiltersSchemaFilters } from '../../comments/generated-schemas/read-comment-filters.schema'
import ReadPromotionFiltersSchema, { ReadPromotionFiltersSchemaFilters } from '../../promotions/generated-schemas/read-promotion-filters.schema'
import ReadProductFiltersSchema, { ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'



export class ReadNotificationFiltersSchemaFilters {type?: NotificationType | null;
customContent?: GenericComparable<"string"> | null;
isRead?: GenericComparable<"bool"> | null;
user?: ReadUserFiltersSchemaFilters | null;
collaboration?: ReadCollaborationFiltersSchemaFilters | null;
comment?: ReadCommentFiltersSchemaFilters | null;
promotion?: ReadPromotionFiltersSchemaFilters | null;
product?: ReadProductFiltersSchemaFilters | null;
userId?: GenericComparable<"number"> | null;
collaborationId?: GenericComparable<"number"> | null;
commentId?: GenericComparable<"number"> | null;
promotionId?: GenericComparable<"number"> | null;
productId?: GenericComparable<"number"> | null}

const ReadNotificationFiltersSchema: v.GenericSchema<ReadNotificationFiltersSchemaFilters> = v.object({type: v.nullish(v.enum(NotificationType)),
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
productId: v.nullish(comparable("number"))});

export default ReadNotificationFiltersSchema;




export type TReadNotificationFiltersSchemaOutput = v.InferOutput<typeof ReadNotificationFiltersSchema>;
export type TReadNotificationFiltersSchemaInput = v.InferInput<typeof ReadNotificationFiltersSchema>;
