import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { LanguageEnum } from '../../../lib/enums';
import { PaymentStatusEnum } from '../../ads/entities/ad.entity';
const UpdateCategorySchema = v.pipe(
	v.object({
		name: v.nullish(v.string()),
		interestedIn: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ userId: v.number(), categoryId: v.number(), count: v.number() })),
			]),
		),
		banners: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						title: v.nullish(v.string()),
						whatsapp: v.nullish(v.string()),
						phoneNumber: v.nullish(v.string()),
						totalViews: v.nullish(v.number()),
						inHomePage: v.nullish(v.boolean()),
						durationDays: v.nullish(v.number()),
						start: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						end: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					}),
				),
			]),
		),
		icon: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					mimetype: v.nullish(v.string()),
					url: v.nullish(v.string()),
					size: v.nullish(v.number()),
					width: v.nullish(v.number()),
					height: v.nullish(v.number()),
				}),
			]),
		),
		translations: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ columns: v.nullish(v.any()), language: v.enum(LanguageEnum) })),
			]),
		),
		filters: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ name: v.nullish(v.string()), isArchived: v.boolean() })),
			]),
		),
		ads: v.nullish(
			v.union([
				v.array(
					v.object({
						start: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						end: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
						price: v.number(),
						enableWhatsapp: v.boolean(),
						enablePhone: v.boolean(),
						paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
						title: v.nullish(v.string()),
						description: v.nullish(v.string()),
						isBlocked: v.nullish(v.boolean()),
						viewsCount: v.nullish(v.number()),
					}),
				),
			]),
		),
		filter: v.nullish(
			v.union([v.object({ id: v.number() }), v.object({ name: v.nullish(v.string()), isArchived: v.boolean() })]),
		),
		visible: v.optional(v.boolean()),
		isArchived: v.optional(v.boolean()),
		index: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'CategoryEntity',
		interestedIn: 'UserInterestEntity',
		banners: 'BannerEntity',
		icon: 'MediaEntity',
		translations: 'TranslationEntity',
		filters: 'CategoryFilterEntity',
		ads: 'AdEntity',
		filter: 'CategoryFilterEntity',
	}),
);
export default UpdateCategorySchema;

export type TUpdateCategorySchemaInput = v.InferInput<typeof UpdateCategorySchema>;
export type TUpdateCategorySchemaOutput = v.InferOutput<typeof UpdateCategorySchema>;
