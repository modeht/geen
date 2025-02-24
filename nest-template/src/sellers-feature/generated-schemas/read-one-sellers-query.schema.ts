import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadSellersRelationsSchema from './read-sellers-relations.schema';
const ReadOneSellersSchema = v.optional(
	v.object({
		relations: v.optional(ReadSellersRelationsSchema),
	}),
);
export default ReadOneSellersSchema;
export type TReadOneSellersSchemaInput = v.InferInput<typeof ReadOneSellersSchema>;
export type TReadOneSellersSchemaOutput = v.InferOutput<typeof ReadOneSellersSchema>;
