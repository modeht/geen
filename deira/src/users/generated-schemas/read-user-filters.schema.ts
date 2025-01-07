import { GenericComparable, comparable } from '../../geen/lib/comparable';
import * as v from 'valibot';
import { GenderEnum } from '../entities/user.entity';
import { RoleEnum } from '../entities/user.entity';
import ReadRedeemFiltersSchema, {
	ReadRedeemFiltersSchemaFilters,
} from '../../redeems/generated-schemas/read-redeem-filters.schema';
import ReadNotificationFiltersSchema, {
	ReadNotificationFiltersSchemaFilters,
} from '../../notifications/generated-schemas/read-notification-filters.schema';
import ReadBannerFiltersSchema, {
	ReadBannerFiltersSchemaFilters,
} from '../../banners/generated-schemas/read-banner-filters.schema';
import ReadFeedbackFiltersSchema, {
	ReadFeedbackFiltersSchemaFilters,
} from '../../feedback/generated-schemas/read-feedback-filters.schema';
import ReadCountryFiltersSchema, {
	ReadCountryFiltersSchemaFilters,
} from '../../countries/generated-schemas/read-country-filters.schema';
import ReadGovernorateFiltersSchema, {
	ReadGovernorateFiltersSchemaFilters,
} from '../../governorate/generated-schemas/read-governorate-filters.schema';
import ReadAdFiltersSchema, { ReadAdFiltersSchemaFilters } from '../../ads/generated-schemas/read-ad-filters.schema';
import ReadWalletFiltersSchema, {
	ReadWalletFiltersSchemaFilters,
} from '../../wallets/generated-schemas/read-wallet-filters.schema';
import ReadFavoriteFiltersSchema, {
	ReadFavoriteFiltersSchemaFilters,
} from '../../favorites/generated-schemas/read-favorite-filters.schema';
import ReadRatingFiltersSchema, {
	ReadRatingFiltersSchemaFilters,
} from '../../ratings/generated-schemas/read-rating-filters.schema';
import ReadConversationFiltersSchema, {
	ReadConversationFiltersSchemaFilters,
} from '../../conversations/generated-schemas/read-conversation-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';
import ReadUserInterestFiltersSchema, {
	ReadUserInterestFiltersSchemaFilters,
} from './read-user-interest-filters.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadUserFiltersSchemaFilters {
	username?: GenericComparable<'string'> | null;
	phone?: GenericComparable<'string'> | null;
	referralCode?: GenericComparable<'string'> | null;
	referrerCode?: GenericComparable<'string'> | null;
	redeems?: ReadRedeemFiltersSchemaFilters | null;
	notifications?: ReadNotificationFiltersSchemaFilters | null;
	bannersCreated?: ReadBannerFiltersSchemaFilters | null;
	banners?: ReadBannerFiltersSchemaFilters | null;
	feedback?: ReadFeedbackFiltersSchemaFilters | null;
	email?: GenericComparable<'string'> | null;
	notifToken?: GenericComparable<'string'> | null;
	password?: GenericComparable<'string'> | null;
	fbId?: GenericComparable<'string'> | null;
	emailVerified?: GenericComparable<'bool'> | null;
	defaultLang?: LanguageEnum | null;
	dateOfBirth?: GenericComparable<'date'> | null;
	isBlocked?: GenericComparable<'bool'> | null;
	country?: ReadCountryFiltersSchemaFilters | null;
	governorate?: ReadGovernorateFiltersSchemaFilters | null;
	ads?: ReadAdFiltersSchemaFilters | null;
	wallet?: ReadWalletFiltersSchemaFilters | null;
	redeem?: ReadRedeemFiltersSchemaFilters | null;
	favorites?: ReadFavoriteFiltersSchemaFilters | null;
	reviewsRecieved?: ReadRatingFiltersSchemaFilters | null;
	reviewsGiven?: ReadRatingFiltersSchemaFilters | null;
	initiatedConversations?: ReadConversationFiltersSchemaFilters | null;
	targetedConversations?: ReadConversationFiltersSchemaFilters | null;
	messages?: ReadMessageFiltersSchemaFilters | null;
	messagesReceived?: ReadMessageFiltersSchemaFilters | null;
	rating?: GenericComparable<'number'> | null;
	reviewsCount?: GenericComparable<'number'> | null;
	gender?: GenderEnum | null;
	role?: RoleEnum | null;
	interests?: ReadUserInterestFiltersSchemaFilters | null;
}

const ReadUserFiltersSchema: v.GenericSchema<ReadUserFiltersSchemaFilters> = v.object({
	username: v.nullish(comparable('string')),
	phone: v.nullish(comparable('string')),
	referralCode: v.nullish(comparable('string')),
	referrerCode: v.nullish(comparable('string')),
	redeems: v.nullish(v.lazy(() => ReadRedeemFiltersSchema)),
	notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
	bannersCreated: v.nullish(v.lazy(() => ReadBannerFiltersSchema)),
	banners: v.nullish(v.lazy(() => ReadBannerFiltersSchema)),
	feedback: v.nullish(v.lazy(() => ReadFeedbackFiltersSchema)),
	email: v.nullish(comparable('string')),
	notifToken: v.nullish(comparable('string')),
	password: v.nullish(comparable('string')),
	fbId: v.nullish(comparable('string')),
	emailVerified: v.nullish(comparable('bool')),
	defaultLang: v.nullish(v.enum(LanguageEnum)),
	dateOfBirth: v.nullish(comparable('date')),
	isBlocked: v.nullish(comparable('bool')),
	country: v.nullish(v.lazy(() => ReadCountryFiltersSchema)),
	governorate: v.nullish(v.lazy(() => ReadGovernorateFiltersSchema)),
	ads: v.nullish(v.lazy(() => ReadAdFiltersSchema)),
	wallet: v.nullish(v.lazy(() => ReadWalletFiltersSchema)),
	redeem: v.nullish(v.lazy(() => ReadRedeemFiltersSchema)),
	favorites: v.nullish(v.lazy(() => ReadFavoriteFiltersSchema)),
	reviewsRecieved: v.nullish(v.lazy(() => ReadRatingFiltersSchema)),
	reviewsGiven: v.nullish(v.lazy(() => ReadRatingFiltersSchema)),
	initiatedConversations: v.nullish(v.lazy(() => ReadConversationFiltersSchema)),
	targetedConversations: v.nullish(v.lazy(() => ReadConversationFiltersSchema)),
	messages: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	messagesReceived: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	rating: v.nullish(comparable('number')),
	reviewsCount: v.nullish(comparable('number')),
	gender: v.nullish(v.enum(GenderEnum)),
	role: v.nullish(v.enum(RoleEnum)),
	interests: v.nullish(v.lazy(() => ReadUserInterestFiltersSchema)),
});

export default ReadUserFiltersSchema;

export type TReadUserFiltersSchemaOutput = v.InferOutput<typeof ReadUserFiltersSchema>;
export type TReadUserFiltersSchemaInput = v.InferInput<typeof ReadUserFiltersSchema>;
