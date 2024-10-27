import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
	AcceptLanguageResolver,
	HeaderResolver,
	I18nModule,
	QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { AffiliationLinksModule } from './affiliation-links/affiliation-links.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthContextModule } from './auth/auth.context';
import { AuthModule } from './auth/auth.module';
import { BrandEngagementsModule } from './brand-engagements/brand-engagements.module';
import { CartsModule } from './carts/carts.module';
import { CategoriesModule } from './categories/categories.module';
import { CollaborationsModule } from './collaborations/collaborations.module';
import { CollectionsModule } from './collections/collections.module';
import { CommentsModule } from './comments/comments.module';
import { ConversationsModule } from './conversations/conversations.module';
import { CountriesModule } from './countries/countries.module';
import { DbModule } from './db/db.module';
import { EmailModule } from './email/email.module';
import {
	QUERY_PARSER,
	QueryParserService,
} from './globals/services/query-parser.service';
import { MediaModule } from './media/media.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { PostsModule } from './posts/posts.module';
import { PreferencesModule } from './preferences/preferences.module';
import { ProductsModule } from './products/products.module';
import { PromotionsModule } from './promotions/promotions.module';
import { RefundsModule } from './refunds/refunds.module';
import { SavedCollectionsModule } from './saved-collections/saved-collections.module';
import { SearchModule } from './search/search.module';
import { StoriesModule } from './stories/stories.module';
import { UiModule } from './ui/ui.module';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './globals/global.module';

import { AffiliationLinkTrackingModule as GeneratedAffiliationLinkTrackingModule } from './affiliation-links/generated-affiliation-link-tracking.module';
import { AffiliationLinkModule as GeneratedAffiliationLinkModule } from './affiliation-links/generated-affiliation-link.module';
import { CartItemsModule as GeneratedCartItemsModule } from './carts/generated-cart-items.module';
import { CartModule as GeneratedCartModule } from './carts/generated-cart.module';
import { CategoryModule as GeneratedCategoryModule } from './categories/generated-category.module';
import { CollaborationModule as GeneratedCollaborationModule } from './collaborations/generated-collaboration.module';
import { CommentModule as GeneratedCommentModule } from './comments/generated-comment.module';
import { ConversationModule as GeneratedConversationModule } from './conversations/generated-conversation.module';
import { CountryModule as GeneratedCountryModule } from './countries/generated-country.module';
import { CollectionModule as GeneratedCollectionModule } from './collections/generated-collection.module';
import { MediaModule as GeneratedMediaModule } from './media/generated-media.module';
import { MessageModule as GeneratedMessageModule } from './messages/generated-message.module';
import { NotificationModule as GeneratedNotificationModule } from './notifications/generated-notification.module';
import { BrandOrderModule as GeneratedBrandOrderModule } from './orders/generated-brand-order.module';
import { OrderItemModule as GeneratedOrderItemModule } from './orders/generated-order-item.module';
import { OrderModule as GeneratedOrderModule } from './orders/generated-order.module';
import { PostModule as GeneratedPostModule } from './posts/generated-post.module';
import { PostLikesModule as GeneratedPostLikesModule } from './posts/generated-post-likes.module';
import { PreferenceModule as GeneratedPreferenceModule } from './preferences/generated-preference.module';
import { ProductOptionValueModule as GeneratedProductOptionValueModule } from './products/generated-product-option-value.module';
import { ProductOptionModule as GeneratedProductOptionModule } from './products/generated-product-option.module';
import { ProductReviewModule as GeneratedProductReviewModule } from './products/generated-product-review.module';
import { ProductVariantModule as GeneratedProductVariantModule } from './products/generated-product-variant.module';
import { ProductModule as GeneratedProductModule } from './products/generated-product.module';
import { TaggedProductModule as GeneratedTaggedProductModule } from './products/generated-tagged-product.module';
import { PromoCodeModule as GeneratedPromoCodeModule } from './promotions/generated-promo-code.module';
import { PromotionModule as GeneratedPromotionModule } from './promotions/generated-promotion.module';
import { SeasonalPromotionModule as GeneratedSeasonalPromotionModule } from './promotions/generated-seasonal-promotion.module';
import { RefundModule as GeneratedRefundModule } from './refunds/generated-refund.module';
import { SavedCollectionItemModule as GeneratedSavedCollectionItemModule } from './saved-collections/generated-saved-collection-item.module';
import { SavedCollectionModule as GeneratedSavedCollectionModule } from './saved-collections/generated-saved-collection.module';
import { RecentSearchesModule as GeneratedRecentSearchesModule } from './search/generated-recent-searches.module';
import { StoryLikesModule as GeneratedStoryLikesModule } from './stories/generated-story-likes.module';
import { StoryModule as GeneratedStoryModule } from './stories/generated-story.module';
import { TranslationModule as GeneratedTranslationModule } from './translations/generated-translation.module';
import { BrandProfileModule as GeneratedBrandProfileModule } from './users/generated-brand-profile.module';
import { ShippingAddressModule as GeneratedShippingAddressModule } from './users/generated-shipping-address.module';
import { ShopperProfileModule as GeneratedShopperProfileModule } from './users/generated-shopper-profile.module';
import { UserModule as GeneratedUserModule } from './users/generated-user.module';
//insert-generated-import

@Module({
	imports: [
		I18nModule.forRoot({
			fallbackLanguage: 'en',
			loaderOptions: {
				path: join(process.cwd(), 'src/i18n/'),
				watch: true,
				includeSubfolders: true,
			},
			typesOutputPath: join(process.cwd(), 'src/generated/i18n.types.ts'),
			resolvers: [
				{
					use: QueryResolver,
					options: ['lang'],
				},
				{
					use: HeaderResolver,
					options: ['x-lang'],
				},
				AcceptLanguageResolver,
			],
		}),
		ConfigModule.forRoot({
			envFilePath: [
				'.env.dev.local',
				'.env.staging.local',
				'.env.production.local',
				'.env.dev',
				'.env.staging',
				'.env.production',
				'.env',
			],
			isGlobal: true,
		}),
		DbModule,
		UsersModule,
		GlobalModule,
		AuthModule,
		MediaModule,
		UiModule,
		AuthContextModule,
		CartsModule,
		ProductsModule,
		CollectionsModule,
		OrdersModule,
		ConversationsModule,
		MessagesModule,
		CollaborationsModule,
		PromotionsModule,
		PostsModule,
		StoriesModule,
		CommentsModule,
		RefundsModule,
		EmailModule,
		PreferencesModule,
		AffiliationLinksModule,
		NotificationsModule,
		CategoriesModule,
		CountriesModule,
		SavedCollectionsModule,
		SearchModule,
		BrandEngagementsModule,

		GeneratedAffiliationLinkTrackingModule,
		GeneratedAffiliationLinkModule,
		GeneratedCartItemsModule,
		GeneratedCartModule,
		GeneratedCategoryModule,
		GeneratedCollaborationModule,
		GeneratedCommentModule,
		GeneratedConversationModule,
		GeneratedCountryModule,
		GeneratedCollectionModule,
		GeneratedMediaModule,
		GeneratedMessageModule,
		GeneratedNotificationModule,
		GeneratedBrandOrderModule,
		GeneratedOrderItemModule,
		GeneratedOrderModule,
		GeneratedPostModule,
		GeneratedPostLikesModule,
		GeneratedPreferenceModule,
		GeneratedProductOptionValueModule,
		GeneratedProductOptionModule,
		GeneratedProductReviewModule,
		GeneratedProductVariantModule,
		GeneratedProductModule,
		GeneratedTaggedProductModule,
		GeneratedPromoCodeModule,
		GeneratedPromotionModule,
		GeneratedSeasonalPromotionModule,
		GeneratedRefundModule,
		GeneratedSavedCollectionItemModule,
		GeneratedSavedCollectionModule,
		GeneratedRecentSearchesModule,
		GeneratedStoryLikesModule,
		GeneratedStoryModule,
		GeneratedTranslationModule,
		GeneratedBrandProfileModule,
		GeneratedShippingAddressModule,
		GeneratedShopperProfileModule,
		GeneratedUserModule,

		//insert-generated-class
	],
	controllers: [AppController],
	providers: [AppService, { provide: QUERY_PARSER, useClass: QueryParserService }],
	exports: [],
})
export class AppModule {}
