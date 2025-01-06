import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from '../countries/entities/country.entity';
import { GovernorateEntity } from '../governorate/entities/governorate.entity';
import { UserEntity } from '../users/entities/user.entity';
import { WalletEntity } from '../wallets/entities/wallet.entity';
import { TranslationEntity } from '../translations/entities/translation.entity';
import { CategoryFilterEntity } from '../category-fitlers/entities/category-filters.entity';
import { RedeemEntity } from '../redeems/entities/redeem.entity';
import { MediaEntity } from '../media/entities/media.entity';
import { AdEntity } from '../ads/entities/ad.entity';
import { PlanEntity } from '../plans/entities/plan.entity';
import { FavoriteEntity } from '../favorites/entities/favorite.entity';
import { RatingEntity } from '../ratings/entities/rating.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { ConversationEntity } from '../conversations/entities/conversation.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { WalletLogEntity } from '../wallets/entities/wallet-log.entity';
import { StaticEntity } from '../statics/entities/static.entity';
import { FeedbackEntity } from '../feedback/entities/feedback.entity';
import { NotificationEntity } from '../notifications/entities/notification.entity';
import { UserInterestEntity } from '../users/entities/user-interests.entity';
import { BannerEntity } from '../banners/entities/banner.entity';

export const entities = [
  CategoryEntity,
  CategoryFilterEntity,
  UserEntity,
  CountryEntity,
  GovernorateEntity,
  WalletEntity,
  TranslationEntity,
  RedeemEntity,
  MediaEntity,
  AdEntity,
  PlanEntity,
  FavoriteEntity,
  RatingEntity,
  ConversationEntity,
  MessageEntity,
  WalletLogEntity,
  StaticEntity,
  FeedbackEntity,
  NotificationEntity,
  UserInterestEntity,
  BannerEntity,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('POSTGRES_HOST'),
          port: configService.getOrThrow('POSTGRES_PORT'),
          username: configService.getOrThrow('POSTGRES_USER'),
          password: configService.getOrThrow('POSTGRES_PASSWORD'),
          database: configService.getOrThrow('POSTGRES_DB'),
          entities: entities,
          synchronize: true,
          logger: 'advanced-console',
          timezone: 'Z',
          charset: 'utf8mb4',
          poolSize: 20,
          logging: 'all',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
