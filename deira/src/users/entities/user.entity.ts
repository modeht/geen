import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LanguageEnum } from '../../../lib/enums';
import { CountryEntity } from '../../countries/entities/country.entity';
import { GovernorateEntity } from '../../governorate/entities/governorate.entity';
import { WalletEntity } from '../../wallets/entities/wallet.entity';
import { RedeemEntity } from '../../redeems/entities/redeem.entity';
import { AdEntity } from '../../ads/entities/ad.entity';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';
import { RatingEntity } from '../../ratings/entities/rating.entity';
import { ConversationEntity } from '../../conversations/entities/conversation.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { FeedbackEntity } from '../../feedback/entities/feedback.entity';
import { permissions } from '../../globals/permissions';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { UserInterestEntity } from './user-interests.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';
import { BannerEntity } from '../../banners/entities/banner.entity';

export enum GenderEnum {
  Male = 'male',
  Female = 'female',
}

export enum RoleEnum {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
}
@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  username: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', nullable: true })
  referralCode: string | null;

  @Column({ type: 'varchar', nullable: true })
  referrerCode: string | null;

  @OneToMany(() => RedeemEntity, (redeems) => redeems.referrer, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  redeems: RedeemEntity[] | null;

  @OneToMany(() => NotificationEntity, (notif) => notif.user, {
    nullable: true,
    cascade: true,
  })
  notifications: NotificationEntity[] | null;

  @OneToMany(() => BannerEntity, (banner) => banner.createdBy, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  bannersCreated: BannerEntity[] | null;

  @OneToMany(() => BannerEntity, (banner) => banner.createdFor, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  banners: BannerEntity[] | null;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  feedback: FeedbackEntity[] | null;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column({ type: 'varchar', nullable: true })
  notifToken: string | null;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column({ type: 'varchar', nullable: true })
  fbId: string | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  emailVerified: boolean | null;

  @Column({
    type: 'enum',
    enum: LanguageEnum,
    default: LanguageEnum.AR,
    nullable: true,
  })
  defaultLang: LanguageEnum | null;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'boolean', nullable: true, default: false })
  isBlocked: boolean | null;

  @ManyToOne(() => CountryEntity, (country) => country.users, {
    nullable: true,
  })
  @JoinColumn({
    name: 'countryId',
  })
  country: CountryEntity | null;

  @ManyToOne(() => GovernorateEntity, (governorate) => governorate.users, {
    nullable: true,
  })
  @JoinColumn({
    name: 'governorateId',
  })
  governorate: GovernorateEntity | null;

  @OneToMany(() => AdEntity, (ads) => ads.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  ads: AdEntity[] | null;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, {
    nullable: true,
    cascade: true,
  })
  wallet: WalletEntity | null;

  @OneToOne(() => RedeemEntity, (redeem) => redeem.redeemer, {
    nullable: true,
    cascade: true,
  })
  redeem: RedeemEntity | null;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user, {
    nullable: true,
    cascade: true,
  })
  favorites: FavoriteEntity[] | null;

  @OneToMany(() => RatingEntity, (rating) => rating.reviewed, {
    nullable: true,
    cascade: true,
  })
  reviewsRecieved: RatingEntity[] | null;

  @OneToMany(() => RatingEntity, (rating) => rating.reviewer, {
    nullable: true,
    cascade: true,
  })
  reviewsGiven: RatingEntity[] | null;

  @OneToMany(
    () => ConversationEntity,
    (conversation) => conversation.initiator,
    {
      nullable: true,
      cascade: true,
    },
  )
  initiatedConversations: ConversationEntity[] | null;

  @OneToMany(() => ConversationEntity, (conversation) => conversation.target, {
    nullable: true,
    cascade: true,
  })
  targetedConversations: ConversationEntity[] | null;

  @OneToMany(() => MessageEntity, (message) => message.sender, {
    nullable: true,
    cascade: true,
  })
  messages: MessageEntity[] | null;

  @OneToMany(() => MessageEntity, (message) => message.receiver, {
    nullable: true,
    cascade: true,
  })
  messagesReceived: MessageEntity[] | null;

  @Column({ type: 'float', nullable: true })
  rating: number | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  reviewsCount: number | null;

  @Column({ type: 'enum', nullable: true, enum: GenderEnum })
  gender: GenderEnum | null;

  @Column({
    type: 'enum',
    nullable: true,
    enum: RoleEnum,
    default: RoleEnum.User,
  })
  role: RoleEnum | null;

  @Column({ type: 'json', nullable: true })
  permissions: any;

  @OneToMany(() => UserInterestEntity, (interest) => interest.user, {
    nullable: true,
    cascade: true,
  })
  interests: UserInterestEntity[] | null;
}
