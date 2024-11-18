import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadUserRelationsSchema, ReadUserRelationsSchemaRelations } from './read-user-relations.schema'
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadCollectionRelationsSchema, ReadCollectionRelationsSchemaRelations } from '../../collections/generated-schemas/read-collection-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'
import { ReadPromotionRelationsSchema, ReadPromotionRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promotion-relations.schema'
import { ReadPromoCodeRelationsSchema, ReadPromoCodeRelationsSchemaRelations } from '../../promotions/generated-schemas/read-promo-code-relations.schema'
import { ReadBrandOrderRelationsSchema, ReadBrandOrderRelationsSchemaRelations } from '../../orders/generated-schemas/read-brand-order-relations.schema'
import { ReadPreferenceRelationsSchema, ReadPreferenceRelationsSchemaRelations } from '../../preferences/generated-schemas/read-preference-relations.schema'
import { ReadCollaborationRelationsSchema, ReadCollaborationRelationsSchemaRelations } from '../../collaborations/generated-schemas/read-collaboration-relations.schema'
import { ReadCategoryRelationsSchema, ReadCategoryRelationsSchemaRelations } from '../../categories/generated-schemas/read-category-relations.schema'
import { ReadCountryRelationsSchema, ReadCountryRelationsSchemaRelations } from '../../countries/generated-schemas/read-country-relations.schema'

export class ReadBrandProfileRelationsSchemaRelations {user?: ReadUserRelationsSchemaRelations | boolean | null | undefined;
logo?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
cover?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
collections?: ReadCollectionRelationsSchemaRelations | boolean | null | undefined;
products?: ReadProductRelationsSchemaRelations | boolean | null | undefined;
promotions?: ReadPromotionRelationsSchemaRelations | boolean | null | undefined;
promoCodes?: ReadPromoCodeRelationsSchemaRelations | boolean | null | undefined;
brandOrders?: ReadBrandOrderRelationsSchemaRelations | boolean | null | undefined;
preferences?: ReadPreferenceRelationsSchemaRelations | boolean | null | undefined;
collaborations?: ReadCollaborationRelationsSchemaRelations | boolean | null | undefined;
categories?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
subCategories?: ReadCategoryRelationsSchemaRelations | boolean | null | undefined;
countries?: ReadCountryRelationsSchemaRelations | boolean | null | undefined}

export const ReadBrandProfileRelationsSchema: v.GenericSchema<ReadBrandProfileRelationsSchemaRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
logo: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
cover: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
collections: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollectionRelationsSchema)])),
products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)])),
promotions: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromotionRelationsSchema)])),
promoCodes: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPromoCodeRelationsSchema)])),
brandOrders: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandOrderRelationsSchema)])),
preferences: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPreferenceRelationsSchema)])),
collaborations: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCollaborationRelationsSchema)])),
categories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)])),
subCategories: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCategoryRelationsSchema)])),
countries: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCountryRelationsSchema)]))})



export type TReadBrandProfileRelationsSchema = v.InferOutput<typeof ReadBrandProfileRelationsSchema>;

export type TReadBrandProfileRelationsSchemaInput = v.InferInput<typeof ReadBrandProfileRelationsSchema>;
