import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadUserRelationsSchema, { ReadUserRelations } from './read-user-relations.schema';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadCollectionRelationsSchema, {
	ReadCollectionRelations,
} from '../../collections/generated-schemas/read-collection-relations.schema';
import ReadProductRelationsSchema, {
	ReadProductRelations,
} from '../../products/generated-schemas/read-product-relations.schema';
import ReadPromotionRelationsSchema, {
	ReadPromotionRelations,
} from '../../promotions/generated-schemas/read-promotion-relations.schema';
import ReadPromoCodeRelationsSchema, {
	ReadPromoCodeRelations,
} from '../../promotions/generated-schemas/read-promo-code-relations.schema';
import ReadBrandOrderRelationsSchema, {
	ReadBrandOrderRelations,
} from '../../orders/generated-schemas/read-brand-order-relations.schema';
import ReadPreferenceRelationsSchema, {
	ReadPreferenceRelations,
} from '../../preferences/generated-schemas/read-preference-relations.schema';
import ReadCollaborationRelationsSchema, {
	ReadCollaborationRelations,
} from '../../collaborations/generated-schemas/read-collaboration-relations.schema';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';
import ReadCountryRelationsSchema, {
	ReadCountryRelations,
} from '../../countries/generated-schemas/read-country-relations.schema';

export class ReadBrandProfileRelations {
	user?: ReadUserRelations | string | boolean;
	logo?: ReadMediaRelations | string | boolean;
	cover?: ReadMediaRelations | string | boolean;
	collections?: ReadCollectionRelations | string | boolean;
	products?: ReadProductRelations | string | boolean;
	promotions?: ReadPromotionRelations | string | boolean;
	promoCodes?: ReadPromoCodeRelations | string | boolean;
	brandOrders?: ReadBrandOrderRelations | string | boolean;
	preferences?: ReadPreferenceRelations | string | boolean;
	collaborations?: ReadCollaborationRelations | string | boolean;
	categories?: ReadCategoryRelations | string | boolean;
	subCategories?: ReadCategoryRelations | string | boolean;
	countries?: ReadCountryRelations | string | boolean;
}

const ReadBrandProfileRelationsSchema: v.GenericSchema<ReadBrandProfileRelations> = v.object({
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
	logo: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
	cover: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
	collections: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCollectionRelationsSchema),
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
	promotions: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromotionRelationsSchema),
		]),
	),
	promoCodes: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromoCodeRelationsSchema),
		]),
	),
	brandOrders: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandOrderRelationsSchema),
		]),
	),
	preferences: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPreferenceRelationsSchema),
		]),
	),
	collaborations: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCollaborationRelationsSchema),
		]),
	),
	categories: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	subCategories: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	countries: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCountryRelationsSchema),
		]),
	),
});

export default ReadBrandProfileRelationsSchema;

export type TReadBrandProfileRelationsSchemaOutput = v.InferOutput<typeof ReadBrandProfileRelationsSchema>;
export type TReadBrandProfileRelationsSchemaInput = v.InferInput<typeof ReadBrandProfileRelationsSchema>;
