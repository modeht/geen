import { GenericComparable, comparable } from '../../geen/lib/comparable';
import { OrderDirectionSchema, OrderDirectionEnum } from '../../geen/schemas/order.schema';
import * as v from 'valibot';
import { GenderEnum } from '../entities/user.entity';
import { RoleEnum } from '../entities/user.entity';
import ReadRedeemOrdersSchema, { ReadRedeemOrders } from '../../redeems/generated-schemas/read-redeem-orders.schema';
import ReadNotificationOrdersSchema, {
	ReadNotificationOrders,
} from '../../notifications/generated-schemas/read-notification-orders.schema';
import ReadBannerOrdersSchema, { ReadBannerOrders } from '../../banners/generated-schemas/read-banner-orders.schema';
import ReadFeedbackOrdersSchema, {
	ReadFeedbackOrders,
} from '../../feedback/generated-schemas/read-feedback-orders.schema';
import ReadCountryOrdersSchema, {
	ReadCountryOrders,
} from '../../countries/generated-schemas/read-country-orders.schema';
import ReadGovernorateOrdersSchema, {
	ReadGovernorateOrders,
} from '../../governorate/generated-schemas/read-governorate-orders.schema';
import ReadAdOrdersSchema, { ReadAdOrders } from '../../ads/generated-schemas/read-ad-orders.schema';
import ReadWalletOrdersSchema, { ReadWalletOrders } from '../../wallets/generated-schemas/read-wallet-orders.schema';
import ReadFavoriteOrdersSchema, {
	ReadFavoriteOrders,
} from '../../favorites/generated-schemas/read-favorite-orders.schema';
import ReadRatingOrdersSchema, { ReadRatingOrders } from '../../ratings/generated-schemas/read-rating-orders.schema';
import ReadConversationOrdersSchema, {
	ReadConversationOrders,
} from '../../conversations/generated-schemas/read-conversation-orders.schema';
import ReadMessageOrdersSchema, {
	ReadMessageOrders,
} from '../../messages/generated-schemas/read-message-orders.schema';
import ReadUserInterestOrdersSchema, { ReadUserInterestOrders } from './read-user-interest-orders.schema';

import { LanguageEnum } from '../../../lib/enums';
export class ReadUserOrders {
	username?: OrderDirectionEnum;
	phone?: OrderDirectionEnum;
	referralCode?: OrderDirectionEnum;
	referrerCode?: OrderDirectionEnum;
	redeems?: ReadRedeemOrders | OrderDirectionEnum;
	notifications?: ReadNotificationOrders | OrderDirectionEnum;
	bannersCreated?: ReadBannerOrders | OrderDirectionEnum;
	banners?: ReadBannerOrders | OrderDirectionEnum;
	feedback?: ReadFeedbackOrders | OrderDirectionEnum;
	email?: OrderDirectionEnum;
	notifToken?: OrderDirectionEnum;
	password?: OrderDirectionEnum;
	fbId?: OrderDirectionEnum;
	emailVerified?: OrderDirectionEnum;
	defaultLang?: LanguageEnum | null;
	dateOfBirth?: OrderDirectionEnum;
	isBlocked?: OrderDirectionEnum;
	country?: ReadCountryOrders | OrderDirectionEnum;
	governorate?: ReadGovernorateOrders | OrderDirectionEnum;
	ads?: ReadAdOrders | OrderDirectionEnum;
	wallet?: ReadWalletOrders | OrderDirectionEnum;
	redeem?: ReadRedeemOrders | OrderDirectionEnum;
	favorites?: ReadFavoriteOrders | OrderDirectionEnum;
	reviewsRecieved?: ReadRatingOrders | OrderDirectionEnum;
	reviewsGiven?: ReadRatingOrders | OrderDirectionEnum;
	initiatedConversations?: ReadConversationOrders | OrderDirectionEnum;
	targetedConversations?: ReadConversationOrders | OrderDirectionEnum;
	messages?: ReadMessageOrders | OrderDirectionEnum;
	messagesReceived?: ReadMessageOrders | OrderDirectionEnum;
	rating?: OrderDirectionEnum;
	reviewsCount?: OrderDirectionEnum;
	gender?: GenderEnum | null;
	role?: RoleEnum | null;
	interests?: ReadUserInterestOrders | OrderDirectionEnum;
}

const ReadUserOrdersSchema: v.GenericSchema<ReadUserOrders> = v.object({
	username: v.optional(OrderDirectionSchema),
	phone: v.optional(OrderDirectionSchema),
	referralCode: v.optional(OrderDirectionSchema),
	referrerCode: v.optional(OrderDirectionSchema),
	redeems: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadRedeemOrdersSchema)])),
	notifications: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadNotificationOrdersSchema)])),
	bannersCreated: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBannerOrdersSchema)])),
	banners: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadBannerOrdersSchema)])),
	feedback: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadFeedbackOrdersSchema)])),
	email: v.optional(OrderDirectionSchema),
	notifToken: v.optional(OrderDirectionSchema),
	password: v.optional(OrderDirectionSchema),
	fbId: v.optional(OrderDirectionSchema),
	emailVerified: v.optional(OrderDirectionSchema),
	defaultLang: v.nullish(v.enum(LanguageEnum)),
	dateOfBirth: v.optional(OrderDirectionSchema),
	isBlocked: v.optional(OrderDirectionSchema),
	country: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadCountryOrdersSchema)])),
	governorate: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadGovernorateOrdersSchema)])),
	ads: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadAdOrdersSchema)])),
	wallet: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadWalletOrdersSchema)])),
	redeem: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadRedeemOrdersSchema)])),
	favorites: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadFavoriteOrdersSchema)])),
	reviewsRecieved: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadRatingOrdersSchema)])),
	reviewsGiven: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadRatingOrdersSchema)])),
	initiatedConversations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
	targetedConversations: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadConversationOrdersSchema)])),
	messages: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	messagesReceived: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
	rating: v.optional(OrderDirectionSchema),
	reviewsCount: v.optional(OrderDirectionSchema),
	gender: v.nullish(v.enum(GenderEnum)),
	role: v.nullish(v.enum(RoleEnum)),
	interests: v.optional(v.union([OrderDirectionSchema, v.lazy(() => ReadUserInterestOrdersSchema)])),
});

export default ReadUserOrdersSchema;

export type TReadUserOrdersSchemaOutput = v.InferOutput<typeof ReadUserOrdersSchema>;
export type TReadUserOrdersSchemaInput = v.InferInput<typeof ReadUserOrdersSchema>;
