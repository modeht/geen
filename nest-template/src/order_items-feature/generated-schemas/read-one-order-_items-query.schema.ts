import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadOrder_itemsRelationsSchema from './read-order-_items-relations.schema';
const ReadOneOrder_itemsSchema = v.optional(
	v.object({
		relations: v.optional(ReadOrder_itemsRelationsSchema),
	}),
);
export default ReadOneOrder_itemsSchema;
export type TReadOneOrder_itemsSchemaInput = v.InferInput<typeof ReadOneOrder_itemsSchema>;
export type TReadOneOrder_itemsSchemaOutput = v.InferOutput<typeof ReadOneOrder_itemsSchema>;
