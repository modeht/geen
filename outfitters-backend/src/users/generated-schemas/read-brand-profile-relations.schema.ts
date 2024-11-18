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



export class ReadBrandProfileRelations {user?: ReadUserRelations | boolean | null | undefined;
logo?: ReadMediaRelations | boolean | null | undefined;
cover?: ReadMediaRelations | boolean | null | undefined;
collections?: ReadCollectionRelations | boolean | null | undefined;
products?: ReadProductRelations | boolean | null | undefined;
promotions?: ReadPromotionRelations | boolean | null | undefined;
promoCodes?: ReadPromoCodeRelations | boolean | null | undefined;
brandOrders?: ReadBrandOrderRelations | boolean | null | undefined;
preferences?: ReadPreferenceRelations | boolean | null | undefined;
collaborations?: ReadCollaborationRelations | boolean | null | undefined;
categories?: ReadCategoryRelations | boolean | null | undefined;
subCategories?: ReadCategoryRelations | boolean | null | undefined;
countries?: ReadCountryRelations | boolean | null | undefined}

export const ReadBrandProfileRelationsSchema: v.GenericSchema<ReadBrandProfileRelations> = v.object({user: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
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



export type TReadBrandProfileRelationsSchemaOutput = v.InferOutput<typeof ReadBrandProfileRelationsSchema>;
export type TReadBrandProfileRelationsSchemaInput = v.InferInput<typeof ReadBrandProfileRelationsSchema>;
