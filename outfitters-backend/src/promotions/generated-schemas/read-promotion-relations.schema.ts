import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import {
	ReadNotificationRelationsSchema,
	ReadNotificationRelationsSchemaRelations,
} from '../../notifications/generated-schemas/read-notification-relations.schema';
import {
	ReadBrandProfileRelationsSchema,
	ReadBrandProfileRelationsSchemaRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';
import {
	ReadSeasonalPromotionRelationsSchema,
	ReadSeasonalPromotionRelationsSchemaRelations,
} from './read-seasonal-promotion-relations.schema';
import {
	ReadProductRelationsSchema,
	ReadProductRelationsSchemaRelations,
} from '../../products/generated-schemas/read-product-relations.schema';
import {
	ReadOrderItemRelationsSchema,
	ReadOrderItemRelationsSchemaRelations,
} from '../../orders/generated-schemas/read-order-item-relations.schema';

export class ReadPromotionRelationsSchemaRelations {
	notifications?: ReadNotificationRelationsSchemaRelations | boolean | null | undefined;
	brand?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
	seasonalPromotion?:
		| ReadSeasonalPromotionRelationsSchemaRelations
		| boolean
		| null
		| undefined;
	products?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
	orderItems?: ReadOrderItemRelationsSchemaRelations | boolean | null | undefined;
}

export const ReadPromotionRelationsSchema: v.GenericSchema<ReadPromotionRelationsSchemaRelations> =
	v.object({
		notifications: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadNotificationRelationsSchema)]),
		),
		brand: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)]),
		),
		seasonalPromotion: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadSeasonalPromotionRelationsSchema)]),
		),
		products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
		orderItems: v.nullish(
			v.union([v.boolean(), v.lazy(() => ReadOrderItemRelationsSchema)]),
		),
	});

export type TReadPromotionRelationsSchema = v.InferOutput<
	typeof ReadPromotionRelationsSchema
>;

export type TReadPromotionRelationsSchemaInput = v.InferInput<
	typeof ReadPromotionRelationsSchema
>;
