import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadBrandOrderRelationsSchema, { ReadBrandOrderRelations } from './read-brand-order-relations.schema';
import ReadProductVariantRelationsSchema, {
	ReadProductVariantRelations,
} from '../../products/generated-schemas/read-product-variant-relations.schema';
import ReadProductRelationsSchema, {
	ReadProductRelations,
} from '../../products/generated-schemas/read-product-relations.schema';
import ReadPromoCodeRelationsSchema, {
	ReadPromoCodeRelations,
} from '../../promotions/generated-schemas/read-promo-code-relations.schema';
import ReadPromotionRelationsSchema, {
	ReadPromotionRelations,
} from '../../promotions/generated-schemas/read-promotion-relations.schema';

export class ReadOrderItemRelations {
	brandOrder?: ReadBrandOrderRelations | string | boolean;
	variant?: ReadProductVariantRelations | string | boolean;
	product?: ReadProductRelations | string | boolean;
	appliedPromoCode?: ReadPromoCodeRelations | string | boolean;
	appliedPromotions?: ReadPromotionRelations | string | boolean;
}

const ReadOrderItemRelationsSchema: v.GenericSchema<ReadOrderItemRelations> = v.object({
	brandOrder: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandOrderRelationsSchema),
		]),
	),
	variant: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductVariantRelationsSchema),
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
	appliedPromoCode: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromoCodeRelationsSchema),
		]),
	),
	appliedPromotions: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromotionRelationsSchema),
		]),
	),
});

export default ReadOrderItemRelationsSchema;

export type TReadOrderItemRelationsSchemaOutput = v.InferOutput<typeof ReadOrderItemRelationsSchema>;
export type TReadOrderItemRelationsSchemaInput = v.InferInput<typeof ReadOrderItemRelationsSchema>;
