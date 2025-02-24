import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadProductsRelationsSchema from './read-products-relations.schema';
const ReadOneProductsSchema = v.optional(
	v.object({
		relations: v.optional(ReadProductsRelationsSchema),
	}),
);
export default ReadOneProductsSchema;
export type TReadOneProductsSchemaInput = v.InferInput<typeof ReadOneProductsSchema>;
export type TReadOneProductsSchemaOutput = v.InferOutput<typeof ReadOneProductsSchema>;
