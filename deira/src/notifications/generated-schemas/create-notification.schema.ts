import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { NotificationTypeEnum } from '../entities/notification.entity';
import { GenderEnum } from '../../users/entities/user.entity';
import { RoleEnum } from '../../users/entities/user.entity';
import { LanguageEnum } from '../../../lib/enums';
const CreateNotificationSchema = v.pipe(
	v.object({
		content: v.nullish(v.string()),
		media: v.nullish(
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
		type: v.nullish(v.enum(NotificationTypeEnum)),
		isSeen: v.nullish(v.boolean()),
	}),
	v.metadata({ [modelSymbol]: 'NotificationEntity', media: 'MediaEntity', user: 'UserEntity' }),
);
export default CreateNotificationSchema;

export type TCreateNotificationSchemaInput = v.InferInput<typeof CreateNotificationSchema>;
export type TCreateNotificationSchemaOutput = v.InferOutput<typeof CreateNotificationSchema>;
