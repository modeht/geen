import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadCollaborationRelationsSchema, {
	ReadCollaborationRelations,
} from '../../collaborations/generated-schemas/read-collaboration-relations.schema';
import ReadCommentRelationsSchema, {
	ReadCommentRelations,
} from '../../comments/generated-schemas/read-comment-relations.schema';
import ReadPromotionRelationsSchema, {
	ReadPromotionRelations,
} from '../../promotions/generated-schemas/read-promotion-relations.schema';
import ReadProductRelationsSchema, {
	ReadProductRelations,
} from '../../products/generated-schemas/read-product-relations.schema';

export class ReadNotificationRelations {
	type?: NotificationType | null;
	user?: ReadUserRelations | string | boolean;
	collaboration?: ReadCollaborationRelations | string | boolean;
	comment?: ReadCommentRelations | string | boolean;
	promotion?: ReadPromotionRelations | string | boolean;
	product?: ReadProductRelations | string | boolean;
}

const ReadNotificationRelationsSchema: v.GenericSchema<ReadNotificationRelations> = v.object({
	type: v.nullish(v.enum(NotificationType)),
	user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	collaboration: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCollaborationRelationsSchema),
		]),
	),
	comment: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCommentRelationsSchema),
		]),
	),
	promotion: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromotionRelationsSchema),
		]),
	),
	product: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductRelationsSchema),
		]),
	),
});

export default ReadNotificationRelationsSchema;

export type TReadNotificationRelationsSchemaOutput = v.InferOutput<typeof ReadNotificationRelationsSchema>;
export type TReadNotificationRelationsSchemaInput = v.InferInput<typeof ReadNotificationRelationsSchema>;
