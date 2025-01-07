import { modelSymbol } from '../../geen/constants/schema-symbols';
import * as v from 'valibot';

import { GenderEnum } from '../entities/user.entity';
import { RoleEnum } from '../entities/user.entity';
import { NotificationTypeEnum } from '../../notifications/entities/notification.entity';
import { LanguageEnum } from '../../../lib/enums';
import { PaymentStatusEnum } from '../../ads/entities/ad.entity';
const CreateUserSchema = v.pipe(
	v.object({
		username: v.nullish(v.string()),
		phone: v.nullish(v.string()),
		referralCode: v.nullish(v.string()),
		referrerCode: v.nullish(v.string()),
		redeems: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ amount: v.number() }))])),
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
		bannersCreated: v.nullish(
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
		feedback: v.nullish(
			v.union([v.array(v.object({ id: v.number() })), v.array(v.object({ message: v.nullish(v.string()) }))]),
		),
		email: v.nullish(v.string()),
		notifToken: v.nullish(v.string()),
		password: v.nullish(v.string()),
		fbId: v.nullish(v.string()),
		emailVerified: v.nullish(v.boolean()),
		defaultLang: v.nullish(v.enum(LanguageEnum)),
		dateOfBirth: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
		isBlocked: v.nullish(v.boolean()),
		country: v.nullish(v.union([v.object({ id: v.number() }), v.object({ name: v.string() })])),
		governorate: v.nullish(v.union([v.object({ id: v.number() }), v.object({ name: v.string() })])),
		ads: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
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
		wallet: v.nullish(v.union([v.object({ id: v.number() }), v.object({ balance: v.number() })])),
		redeem: v.nullish(v.union([v.object({ id: v.number() }), v.object({ amount: v.number() })])),
		favorites: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({}))])),
		reviewsRecieved: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ stars: v.number(), review: v.nullish(v.string()) })),
			]),
		),
		reviewsGiven: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ stars: v.number(), review: v.nullish(v.string()) })),
			]),
		),
		initiatedConversations: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({}))])),
		targetedConversations: v.nullish(v.union([v.array(v.object({ id: v.number() })), v.array(v.object({}))])),
		messages: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ content: v.nullish(v.string()), isRead: v.nullish(v.boolean()) })),
			]),
		),
		messagesReceived: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ content: v.nullish(v.string()), isRead: v.nullish(v.boolean()) })),
			]),
		),
		rating: v.nullish(v.number()),
		reviewsCount: v.nullish(v.number()),
		gender: v.nullish(v.enum(GenderEnum)),
		role: v.nullish(v.enum(RoleEnum)),
		permissions: v.any(),
		interests: v.nullish(
			v.union([
				v.array(v.object({ id: v.number() })),
				v.array(v.object({ userId: v.number(), categoryId: v.number(), count: v.number() })),
			]),
		),
	}),
	v.metadata({
		[modelSymbol]: 'UserEntity',
		redeems: 'RedeemEntity',
		notifications: 'NotificationEntity',
		bannersCreated: 'BannerEntity',
		banners: 'BannerEntity',
		feedback: 'FeedbackEntity',
		country: 'CountryEntity',
		governorate: 'GovernorateEntity',
		ads: 'AdEntity',
		wallet: 'WalletEntity',
		redeem: 'RedeemEntity',
		favorites: 'FavoriteEntity',
		reviewsRecieved: 'RatingEntity',
		reviewsGiven: 'RatingEntity',
		initiatedConversations: 'ConversationEntity',
		targetedConversations: 'ConversationEntity',
		messages: 'MessageEntity',
		messagesReceived: 'MessageEntity',
		interests: 'UserInterestEntity',
	}),
);
export default CreateUserSchema;

export type TCreateUserSchemaInput = v.InferInput<typeof CreateUserSchema>;
export type TCreateUserSchemaOutput = v.InferOutput<typeof CreateUserSchema>;
