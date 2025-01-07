import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { GenderEnum } from '../entities/user.entity';
import { RoleEnum } from '../entities/user.entity';
import ReadRedeemRelationsSchema, {
	ReadRedeemRelations,
} from '../../redeems/generated-schemas/read-redeem-relations.schema';
import ReadNotificationRelationsSchema, {
	ReadNotificationRelations,
} from '../../notifications/generated-schemas/read-notification-relations.schema';
import ReadBannerRelationsSchema, {
	ReadBannerRelations,
} from '../../banners/generated-schemas/read-banner-relations.schema';
import ReadFeedbackRelationsSchema, {
	ReadFeedbackRelations,
} from '../../feedback/generated-schemas/read-feedback-relations.schema';
import ReadCountryRelationsSchema, {
	ReadCountryRelations,
} from '../../countries/generated-schemas/read-country-relations.schema';
import ReadGovernorateRelationsSchema, {
	ReadGovernorateRelations,
} from '../../governorate/generated-schemas/read-governorate-relations.schema';
import ReadAdRelationsSchema, { ReadAdRelations } from '../../ads/generated-schemas/read-ad-relations.schema';
import ReadWalletRelationsSchema, {
	ReadWalletRelations,
} from '../../wallets/generated-schemas/read-wallet-relations.schema';
import ReadFavoriteRelationsSchema, {
	ReadFavoriteRelations,
} from '../../favorites/generated-schemas/read-favorite-relations.schema';
import ReadRatingRelationsSchema, {
	ReadRatingRelations,
} from '../../ratings/generated-schemas/read-rating-relations.schema';
import ReadConversationRelationsSchema, {
	ReadConversationRelations,
} from '../../conversations/generated-schemas/read-conversation-relations.schema';
import ReadMessageRelationsSchema, {
	ReadMessageRelations,
} from '../../messages/generated-schemas/read-message-relations.schema';
import ReadUserInterestRelationsSchema, { ReadUserInterestRelations } from './read-user-interest-relations.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadUserRelations {
	redeems?: ReadRedeemRelations | string | boolean;
	notifications?: ReadNotificationRelations | string | boolean;
	bannersCreated?: ReadBannerRelations | string | boolean;
	banners?: ReadBannerRelations | string | boolean;
	feedback?: ReadFeedbackRelations | string | boolean;
	defaultLang?: LanguageEnum | null;
	country?: ReadCountryRelations | string | boolean;
	governorate?: ReadGovernorateRelations | string | boolean;
	ads?: ReadAdRelations | string | boolean;
	wallet?: ReadWalletRelations | string | boolean;
	redeem?: ReadRedeemRelations | string | boolean;
	favorites?: ReadFavoriteRelations | string | boolean;
	reviewsRecieved?: ReadRatingRelations | string | boolean;
	reviewsGiven?: ReadRatingRelations | string | boolean;
	initiatedConversations?: ReadConversationRelations | string | boolean;
	targetedConversations?: ReadConversationRelations | string | boolean;
	messages?: ReadMessageRelations | string | boolean;
	messagesReceived?: ReadMessageRelations | string | boolean;
	gender?: GenderEnum | null;
	role?: RoleEnum | null;
	interests?: ReadUserInterestRelations | string | boolean;
}

const ReadUserRelationsSchema: v.GenericSchema<ReadUserRelations> = v.object({
	redeems: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadRedeemRelationsSchema),
		]),
	),
	notifications: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadNotificationRelationsSchema),
		]),
	),
	bannersCreated: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBannerRelationsSchema),
		]),
	),
	banners: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadBannerRelationsSchema),
		]),
	),
	feedback: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadFeedbackRelationsSchema),
		]),
	),
	defaultLang: v.nullish(v.enum(LanguageEnum)),
	country: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCountryRelationsSchema),
		]),
	),
	governorate: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadGovernorateRelationsSchema),
		]),
	),
	ads: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadAdRelationsSchema),
		]),
	),
	wallet: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadWalletRelationsSchema),
		]),
	),
	redeem: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadRedeemRelationsSchema),
		]),
	),
	favorites: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadFavoriteRelationsSchema),
		]),
	),
	reviewsRecieved: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadRatingRelationsSchema),
		]),
	),
	reviewsGiven: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadRatingRelationsSchema),
		]),
	),
	initiatedConversations: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadConversationRelationsSchema),
		]),
	),
	targetedConversations: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadConversationRelationsSchema),
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
	messagesReceived: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMessageRelationsSchema),
		]),
	),
	gender: v.nullish(v.enum(GenderEnum)),
	role: v.nullish(v.enum(RoleEnum)),
	interests: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserInterestRelationsSchema),
		]),
	),
});

export default ReadUserRelationsSchema;

export type TReadUserRelationsSchemaOutput = v.InferOutput<typeof ReadUserRelationsSchema>;
export type TReadUserRelationsSchemaInput = v.InferInput<typeof ReadUserRelationsSchema>;
