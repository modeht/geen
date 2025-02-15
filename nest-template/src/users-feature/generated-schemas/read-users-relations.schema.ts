import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';

export class ReadUsersRelations {}

const ReadUsersRelationsSchema: v.GenericSchema<ReadUsersRelations> = v.object({});

export default ReadUsersRelationsSchema;

export type TReadUsersRelationsSchemaOutput = v.InferOutput<typeof ReadUsersRelationsSchema>;
export type TReadUsersRelationsSchemaInput = v.InferInput<typeof ReadUsersRelationsSchema>;
