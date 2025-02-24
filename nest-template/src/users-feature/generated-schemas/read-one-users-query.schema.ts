import * as v from 'valibot';
import { ReadPaginationSchema } from '../../geen/schemas/pagination.schema';

import ReadUsersRelationsSchema from './read-users-relations.schema';
const ReadOneUsersSchema = v.optional(
	v.object({
		relations: v.optional(ReadUsersRelationsSchema),
	}),
);
export default ReadOneUsersSchema;
export type TReadOneUsersSchemaInput = v.InferInput<typeof ReadOneUsersSchema>;
export type TReadOneUsersSchemaOutput = v.InferOutput<typeof ReadOneUsersSchema>;
