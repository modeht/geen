import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import {
	ReadPreferenceRelationsSchema,
	ReadPreferenceRelations,
} from '../../preferences/generated-schemas/read-preference-relations.schema';
import {
	ReadCollectionRelationsSchema,
	ReadCollectionRelations,
} from '../../collections/generated-schemas/read-collection-relations.schema';
import {
	ReadShopperProfileRelationsSchema,
	ReadShopperProfileRelations,
} from '../../users/generated-schemas/read-shopper-profile-relations.schema';
import {
	ReadStoryRelationsSchema,
	ReadStoryRelations,
} from '../../stories/generated-schemas/read-story-relations.schema';
import {
	ReadBrandProfileRelationsSchema,
	ReadBrandProfileRelations,
} from '../../users/generated-schemas/read-brand-profile-relations.schema';
import {
	ReadCategoryRelationsSchema,
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';
import {
	ReadCountryRelationsSchema,
	ReadCountryRelations,
} from '../../countries/generated-schemas/read-country-relations.schema';
import {
	ReadPostRelationsSchema,
	ReadPostRelations,
} from '../../posts/generated-schemas/read-post-relations.schema';
import {
	ReadProductRelationsSchema,
	ReadProductRelations,
} from '../../products/generated-schemas/read-product-relations.schema';
import {
	ReadProductVariantRelationsSchema,
	ReadProductVariantRelations,
} from '../../products/generated-schemas/read-product-variant-relations.schema';
import {
	ReadMessageRelationsSchema,
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';
import {
	ReadProductReviewRelationsSchema,
	ReadProductReviewRelations,
} from '../../products/generated-schemas/read-product-review-relations.schema';

export class ReadMediaRelations {
	preference?: ReadPreferenceRelations | string | boolean | undefined;
	collectionCover?: ReadCollectionRelations | string | boolean | undefined;
	user?: ReadShopperProfileRelations | string | boolean | undefined;
	story?: ReadStoryRelations | string | boolean | undefined;
	brandStoreCover?: ReadBrandProfileRelations | string | boolean | undefined;
	brandStoreLogo?: ReadBrandProfileRelations | string | boolean | undefined;
	category?: ReadCategoryRelations | string | boolean | undefined;
	country?: ReadCountryRelations | string | boolean | undefined;
	postThumbnail?: ReadPostRelations | string | boolean | undefined;
	product?: ReadProductRelations | string | boolean | undefined;
	productVariant?: ReadProductVariantRelations | string | boolean | undefined;
	message?: ReadMessageRelations | string | boolean | undefined;
	post?: ReadPostRelations | string | boolean | undefined;
	review?: ReadProductReviewRelations | string | boolean | undefined;
}

export const ReadMediaRelationsSchema: v.GenericSchema<ReadMediaRelations> = v.object({
	preference: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPreferenceRelationsSchema),
		]),
	),
	collectionCover: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCollectionRelationsSchema),
		]),
	),
	user: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadShopperProfileRelationsSchema),
		]),
	),
	story: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadStoryRelationsSchema),
		]),
	),
	brandStoreCover: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandProfileRelationsSchema),
		]),
	),
	brandStoreLogo: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBrandProfileRelationsSchema),
		]),
	),
	category: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	country: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCountryRelationsSchema),
		]),
	),
	postThumbnail: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPostRelationsSchema),
		]),
	),
	product: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductRelationsSchema),
		]),
	),
	productVariant: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductVariantRelationsSchema),
		]),
	),
	message: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMessageRelationsSchema),
		]),
	),
	post: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPostRelationsSchema),
		]),
	),
	review: v.undefinedable(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductReviewRelationsSchema),
		]),
	),
});

export type TReadMediaRelationsSchemaOutput = v.InferOutput<
	typeof ReadMediaRelationsSchema
>;
export type TReadMediaRelationsSchemaInput = v.InferInput<
	typeof ReadMediaRelationsSchema
>;
