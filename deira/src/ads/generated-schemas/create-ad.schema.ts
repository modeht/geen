import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { PaymentStatusEnum } from '../entities/ad.entity';
import { GenderEnum } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
import { PlanTypeEnum } from '../../plans/entities/plan.entity';
const CreateAdSchema = v.pipe(
	v.object({
		user: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					username: v.nullish(v.string()),
					phone: v.nullish(v.string()),
					referralCode: v.nullish(v.string()),
					referrerCode: v.nullish(v.string()),
					email: v.nullish(v.string()),
					notifToken: v.nullish(v.string()),
					password: v.nullish(v.string()),
					fbId: v.nullish(v.string()),
					emailVerified: v.nullish(v.boolean()),
					defaultLang: v.nullish(v.enum(LanguageEnum)),
					dateOfBirth: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					isBlocked: v.nullish(v.boolean()),
					rating: v.nullish(v.number()),
					reviewsCount: v.nullish(v.number()),
					gender: v.nullish(v.enum(GenderEnum)),
					role: v.nullish(v.enum(RoleEnum)),
					permissions: v.nullish(v.any()),
				}),
			]),
		),
		messages: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ content: v.nullish(v.string()), isRead: v.nullish(v.boolean()) })),
			]),
		),
		governorates: v.nullish(v.union([v.array(v.object({ name: v.string() }))])),
		plan: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					name: v.nullish(v.string()),
					description: v.nullish(v.string()),
					price: v.nullish(v.number()),
					mediaLimit: v.nullish(v.number()),
					videoLimit: v.nullish(v.number()),
					durationDays: v.nullish(v.number()),
					index: v.nullish(v.number()),
					type: v.nullish(v.enum(PlanTypeEnum)),
					isArchived: v.nullish(v.boolean()),
				}),
			]),
		),
		start: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		end: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
		media: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						mimetype: v.nullish(v.string()),
						url: v.nullish(v.string()),
						size: v.nullish(v.number()),
						width: v.nullish(v.number()),
						height: v.nullish(v.number()),
					}),
				),
			]),
		),
		categories: v.nullish(
			v.union([
				v.array(
					v.object({
						name: v.nullish(v.string()),
						visible: v.boolean(),
						isArchived: v.boolean(),
						index: v.nullish(v.number()),
					}),
				),
			]),
		),
		filters: v.nullish(v.union([v.array(v.object({ name: v.nullish(v.string()), isArchived: v.boolean() }))])),
		price: v.number(),
		enableWhatsapp: v.boolean(),
		enablePhone: v.boolean(),
		paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
		title: v.nullish(v.pipe(v.string(), v.maxLength(255))),
		description: v.nullish(v.string()),
		fans: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({}))])),
		isBlocked: v.nullish(v.boolean()),
		viewsCount: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'AdEntity',
		user: 'UserEntity',
		messages: 'MessageEntity',
		governorates: 'GovernorateEntity',
		plan: 'PlanEntity',
		media: 'MediaEntity',
		categories: 'CategoryEntity',
		filters: 'CategoryFilterEntity',
		fans: 'FavoriteEntity',
	}),
);
export default CreateAdSchema;

export type TCreateAdSchemaInput = v.InferInput<typeof CreateAdSchema>;
export type TCreateAdSchemaOutput = v.InferOutput<typeof CreateAdSchema>;
