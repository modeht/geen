import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelationsSchemaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadBrandProfileRelationsSchema, ReadBrandProfileRelationsSchemaRelations } from '../../users/generated-schemas/read-brand-profile-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelationsSchemaRelations } from '../../products/generated-schemas/read-product-relations.schema'

export class ReadCollectionRelationsSchemaRelations {cover?: ReadMediaRelationsSchemaRelations | boolean | null | undefined;
brand?: ReadBrandProfileRelationsSchemaRelations | boolean | null | undefined;
products?: ReadProductRelationsSchemaRelations | boolean | null | undefined}

export const ReadCollectionRelationsSchema: v.GenericSchema<ReadCollectionRelationsSchemaRelations> = v.object({cover: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
brand: v.nullish(v.union([v.boolean(), v.lazy(() => ReadBrandProfileRelationsSchema)])),
products: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadCollectionRelationsSchemaOutput = v.InferOutput<typeof ReadCollectionRelationsSchema>;
export type TReadCollectionRelationsSchemaInput = v.InferInput<typeof ReadCollectionRelationsSchema>;
