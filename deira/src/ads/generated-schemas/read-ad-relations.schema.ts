import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { PaymentStatusEnum } from '../entities/ad.entity';
import ReadUserRelationsSchema, { ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';
import ReadGovernorateRelationsSchema, {
	ReadGovernorateRelations,
} from '../../governorate/generated-schemas/read-governorate-relations.schema';
import ReadPlanRelationsSchema, { ReadPlanRelations } from '../../plans/generated-schemas/read-plan-relations.schema';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadCategoryRelationsSchema, {
	ReadCategoryRelations,
} from '../../categories/generated-schemas/read-category-relations.schema';
import ReadCategoryFilterRelationsSchema, {
	ReadCategoryFilterRelations,
} from '../../category-fitlers/generated-schemas/read-category-filter-relations.schema';
import ReadFavoriteRelationsSchema, {
	ReadFavoriteRelations,
} from '../../favorites/generated-schemas/read-favorite-relations.schema';

export class ReadAdRelations {
	user?: ReadUserRelations | string | boolean;
	messages?: ReadMessageRelations | string | boolean;
	governorates?: ReadGovernorateRelations | string | boolean;
	plan?: ReadPlanRelations | string | boolean;
	media?: ReadMediaRelations | string | boolean;
	categories?: ReadCategoryRelations | string | boolean;
	filters?: ReadCategoryFilterRelations | string | boolean;
	paymentStatus?: PaymentStatusEnum | null;
	fans?: ReadFavoriteRelations | string | boolean;
}

const ReadAdRelationsSchema: v.GenericSchema<ReadAdRelations> = v.object({
	user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	messages: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMessageRelationsSchema),
		]),
	),
	governorates: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadGovernorateRelationsSchema),
		]),
	),
	plan: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPlanRelationsSchema),
		]),
	),
	media: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
	categories: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryRelationsSchema),
		]),
	),
	filters: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCategoryFilterRelationsSchema),
		]),
	),
	paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
	fans: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadFavoriteRelationsSchema),
		]),
	),
});

export default ReadAdRelationsSchema;

export type TReadAdRelationsSchemaOutput = v.InferOutput<typeof ReadAdRelationsSchema>;
export type TReadAdRelationsSchemaInput = v.InferInput<typeof ReadAdRelationsSchema>;
