import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { AdEntity } from '../../ads/entities/ad.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';
import { BannerEntity } from '../../banners/entities/banner.entity';
import { MessageEntity } from '../../messages/entities/message.entity';

@Entity({
  name: 'media',
})
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdEntity, (ad) => ad.media, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'adId',
  })
  ad: AdEntity | null;

  @OneToMany(() => CategoryEntity, (category) => category.icon, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  categories: CategoryEntity[] | null;

  @OneToMany(() => NotificationEntity, (notification) => notification.media, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  notifications: NotificationEntity[] | null;

  @OneToMany(() => BannerEntity, (banner) => banner.media, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  banner: BannerEntity | null;

  @ManyToMany(() => MessageEntity, (message) => message.media, {
    nullable: true,
  })
  messages: MessageEntity[] | null;

  @Column({ type: 'varchar', nullable: true })
  mimetype: string | null;

  @Column({ type: 'text', nullable: true })
  url: string | null;

  @Column({ type: 'float', nullable: true })
  size: number | null;

  @Column({ type: 'float', nullable: true })
  width: number | null;

  @Column({ type: 'float', nullable: true })
  height: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
