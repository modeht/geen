import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadCart_itemsRelationsSchema from './read-cart-_items-relations.schema';
const ReadOneCart_itemsSchema = v.optional(
	v.object({
		relations: v.optional(ReadCart_itemsRelationsSchema),
	}),
);
export default ReadOneCart_itemsSchema;
export type TReadOneCart_itemsSchemaInput = v.InferInput<typeof ReadOneCart_itemsSchema>;
export type TReadOneCart_itemsSchemaOutput = v.InferOutput<typeof ReadOneCart_itemsSchema>;
