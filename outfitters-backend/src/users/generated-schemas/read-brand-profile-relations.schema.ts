import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelations } from './read-user-relations.schema'
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadCollectionRelationsSchema, ReadCollectionRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'
import { ReadBrandOrderRelationsSchema, ReadBrandOrderRelations } from '../../orders/generated-schemas/read-brand-order-relations.schema'
import { ReadPreferenceRelationsSchema, ReadPreferenceRelations } from '../../preferences/generated-schemas/read-preference-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadCategoryRelationsSchema, ReadCategoryRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import { ReadCountryRelationsSchema, ReadCountryRelations } from '../../countries/generated-schemas/read-country-relations.schema'



export class ReadBrandProfileRelations {user?: ReadUserRelations | string | boolean | undefined;
logo?: ReadMediaRelations | string | boolean | undefined;
cover?: ReadMediaRelations | string | boolean | undefined;
collections?: ReadCollectionRelations | string | boolean | undefined;
products?: ReadProductRelations | string | boolean | undefined;
promotions?: ReadPromotionRelations | string | boolean | undefined;
promoCodes?: ReadPromoCodeRelations | string | boolean | undefined;
brandOrders?: ReadBrandOrderRelations | string | boolean | undefined;
preferences?: ReadPreferenceRelations | string | boolean | undefined;
collaborations?: ReadCollaborationRelations | string | boolean | undefined;
categories?: ReadCategoryRelations | string | boolean | undefined;
subCategories?: ReadCategoryRelations | string | boolean | undefined;
countries?: ReadCountryRelations | string | boolean | undefined}

export const ReadBrandProfileRelationsSchema: v.GenericSchema<ReadBrandProfileRelations> = v.object({user: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadUserRelationsSchema)])),
logo: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
cover: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadMediaRelationsSchema)])),
collections: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCollectionRelationsSchema)])),
products: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadProductRelationsSchema)])),
promotions: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPromotionRelationsSchema)])),
promoCodes: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPromoCodeRelationsSchema)])),
brandOrders: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadBrandOrderRelationsSchema)])),
preferences: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadPreferenceRelationsSchema)])),
collaborations: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCollaborationRelationsSchema)])),
categories: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
subCategories: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCategoryRelationsSchema)])),
countries: v.undefinedable(v.union([v.pipe(
					v.union([v.string(), v.boolean()]),
					v.transform((input) => (input === 'true' ? true : false)),
					v.boolean(),), v.lazy(() => ReadCountryRelationsSchema)]))})



export type TReadBrandProfileRelationsSchemaOutput = v.InferOutput<typeof ReadBrandProfileRelationsSchema>;
export type TReadBrandProfileRelationsSchemaInput = v.InferInput<typeof ReadBrandProfileRelationsSchema>;
