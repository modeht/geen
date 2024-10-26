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
	],
	controllers: [AppController],
	providers: [AppService, { provide: QUERY_PARSER, useClass: QueryParserService }],
	exports: [],
})
export class AppModule {}
