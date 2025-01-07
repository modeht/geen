import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';

export class ReadStaticRelations {}

const ReadStaticRelationsSchema: v.GenericSchema<ReadStaticRelations> = v.object({});

export default ReadStaticRelationsSchema;

export type TReadStaticRelationsSchemaOutput = v.InferOutput<typeof ReadStaticRelationsSchema>;
export type TReadStaticRelationsSchemaInput = v.InferInput<typeof ReadStaticRelationsSchema>;
