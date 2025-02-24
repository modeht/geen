import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadOrdersRelationsSchema from './read-orders-relations.schema';
const ReadOneOrdersSchema = v.optional(
	v.object({
		relations: v.optional(ReadOrdersRelationsSchema),
	}),
);
export default ReadOneOrdersSchema;
export type TReadOneOrdersSchemaInput = v.InferInput<typeof ReadOneOrdersSchema>;
export type TReadOneOrdersSchemaOutput = v.InferOutput<typeof ReadOneOrdersSchema>;
