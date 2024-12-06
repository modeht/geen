import { GenericComparable, comparable } from '../../globals/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../globals/schemas/order.schema';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
export class ReadTranslationOrders {
	language?: LanguageEnum | null;
}

const ReadTranslationOrdersSchema: v.GenericSchema<ReadTranslationOrders> = v.object({
	language: v.nullish(v.enum(LanguageEnum)),
});

export default ReadTranslationOrdersSchema;

export type TReadTranslationOrdersSchemaOutput = v.InferOutput<typeof ReadTranslationOrdersSchema>;
export type TReadTranslationOrdersSchemaInput = v.InferInput<typeof ReadTranslationOrdersSchema>;
