import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Geometry,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { GovernorateEntity } from '../../governorate/entities/governorate.entity';
import { PlanEntity } from '../../plans/entities/plan.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CategoryFilterEntity } from '../../category-fitlers/entities/category-filters.entity';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';
import { RatingEntity } from '../../ratings/entities/rating.entity';
import { MessageEntity } from '../../messages/entities/message.entity';

export enum PaymentStatusEnum {
  Pending = 'pending',
  Paid = 'paid',
  Unpaid = 'unpaid',
}

@Entity({
  name: 'ads',
})
export class AdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.ads, {
    nullable: true,
  })
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity | null;

  @OneToMany(() => MessageEntity, (message) => message.ad, {
    onDelete: 'SET NULL',
  })
  messages: MessageEntity[];

  @ManyToMany(() => GovernorateEntity, (governorate) => governorate.ads, {
    cascade: true,
  })
  @JoinTable({
    name: 'ads_governorates',
    joinColumn: {
      name: 'adsId',
    },
    inverseJoinColumn: {
      name: 'governoratesId',
    },
  })
  governorates: GovernorateEntity[];

  @ManyToOne(() => PlanEntity, (plan) => plan.ads, {
    nullable: true,
  })
  @JoinColumn({
    name: 'planId',
  })
  plan: PlanEntity | null;

  @Column({ type: 'date', nullable: true, select: false })
  start: Date | null;

  @Column({ type: 'date', nullable: true, select: false })
  end: Date | null;

  @OneToMany(() => MediaEntity, (media) => media.ad, {
    cascade: true,
  })
  media: MediaEntity[] | null;

  @ManyToMany(() => CategoryEntity, (category) => category.ads, {
    cascade: true,
  })
  @JoinTable({
    name: 'ads_categories',
  })
  categories: CategoryEntity[];

  @ManyToMany(
    () => CategoryFilterEntity,
    (categoryFilter) => categoryFilter.ads,
    {
      cascade: true,
    },
  )
  @JoinTable({
    name: 'ads_filters',
  })
  filters: CategoryFilterEntity[];

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'boolean' })
  enableWhatsapp: boolean;

  @Column({ type: 'boolean' })
  enablePhone: boolean;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    nullable: true,
    select: false,
  })
  paymentStatus: PaymentStatusEnum | null;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  @Index()
  title: string | null;

  @Column({ type: 'text', nullable: true })
  @Index()
  description: string | null;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.ad, {
    nullable: true,
  })
  fans: FavoriteEntity | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  isBlocked: boolean | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  viewsCount: number | null;
}
