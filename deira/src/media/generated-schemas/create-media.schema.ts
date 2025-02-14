import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { PaymentStatusEnum } from '../../ads/entities/ad.entity';
import { NotificationTypeEnum } from '../../notifications/entities/notification.entity';
const CreateMediaSchema = v.pipe(
	v.object({
		ad: v.nullish(
			v.union([
				v.object({ id: v.number() }),
				v.object({
					start: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					end: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
					price: v.number(),
					enableWhatsapp: v.boolean(),
					enablePhone: v.boolean(),
					paymentStatus: v.nullish(v.enum(PaymentStatusEnum)),
					title: v.nullish(v.pipe(v.string(), v.maxLength(255))),
					description: v.nullish(v.string()),
					isBlocked: v.nullish(v.boolean()),
					viewsCount: v.nullish(v.number()),
				}),
			]),
		),
		categories: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
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
		notifications: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(
					v.object({
						content: v.nullish(v.string()),
						type: v.nullish(v.enum(NotificationTypeEnum)),
						isSeen: v.nullish(v.boolean()),
					}),
				),
			]),
		),
		banner: v.nullish(
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
		messages: v.nullish(
			v.union([v.array(v.object({ content: v.nullish(v.string()), isRead: v.nullish(v.boolean()) }))]),
		),
		mimetype: v.nullish(v.string()),
		url: v.nullish(v.string()),
		size: v.nullish(v.number()),
		width: v.nullish(v.number()),
		height: v.nullish(v.number()),
	}),
	v.metadata({
		[modelSymbol]: 'MediaEntity',
		ad: 'AdEntity',
		categories: 'CategoryEntity',
		notifications: 'NotificationEntity',
		banner: 'BannerEntity',
		messages: 'MessageEntity',
	}),
);
export default CreateMediaSchema;

export type TCreateMediaSchemaInput = v.InferInput<typeof CreateMediaSchema>;
export type TCreateMediaSchemaOutput = v.InferOutput<typeof CreateMediaSchema>;
