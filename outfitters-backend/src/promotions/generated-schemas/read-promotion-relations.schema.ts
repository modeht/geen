import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadNotificationRelationsSchema, {
	ReadNotificationRelations,
} from '../../notifications/generated-schemas/read-notification-relations.schema';
import ReadBrandProfileRelationsSchema, {
	ReadBrandProfileRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';
import ReadSeasonalPromotionRelationsSchema, {
	ReadSeasonalPromotionRelations,
} from './read-seasonal-promotion-relations.schema';
import ReadProductRelationsSchema, {
	ReadProductRelations,
} from '../../products/generated-schemas/read-product-relations.schema';
import ReadOrderItemRelationsSchema, {
	ReadOrderItemRelations,
} from '../../orders/generated-schemas/read-order-item-relations.schema';

import { PromotionTypeEnum } from '../entities/enums';
import { PromotionTargetEnum } from '../entities/enums';
import { PromotionStatusEnum } from '../entities/enums';
export class ReadPromotionRelations {
	type?: PromotionTypeEnum | null;
	target?: PromotionTargetEnum | null;
	status?: PromotionStatusEnum | null;
	notifications?: ReadNotificationRelations | string | boolean;
	brand?: ReadBrandProfileRelations | string | boolean;
	seasonalPromotion?: ReadSeasonalPromotionRelations | string | boolean;
	products?: ReadProductRelations | string | boolean;
	orderItems?: ReadOrderItemRelations | string | boolean;
}

const ReadPromotionRelationsSchema: v.GenericSchema<ReadPromotionRelations> = v.object({
	type: v.nullish(v.enum(PromotionTypeEnum)),
	target: v.nullish(v.enum(PromotionTargetEnum)),
	status: v.nullish(v.enum(PromotionStatusEnum)),
	notifications: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadNotificationRelationsSchema),
		]),
	),
	brand: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandProfileRelationsSchema),
		]),
	),
	seasonalPromotion: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadSeasonalPromotionRelationsSchema),
		]),
	),
	products: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductRelationsSchema),
		]),
	),
	orderItems: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrderItemRelationsSchema),
		]),
	),
});

export default ReadPromotionRelationsSchema;

export type TReadPromotionRelationsSchemaOutput = v.InferOutput<typeof ReadPromotionRelationsSchema>;
export type TReadPromotionRelationsSchemaInput = v.InferInput<typeof ReadPromotionRelationsSchema>;
