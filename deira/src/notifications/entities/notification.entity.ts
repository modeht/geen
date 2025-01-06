import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { UserEntity } from '../../users/entities/user.entity';

export enum NotificationTypeEnum {
  UserRating = 'user_rating',
  NewMessage = 'new_message',
  AdPublished = 'ad_published',
}

@Entity({
  name: 'notifications',
})
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  content: string | null;

  @ManyToOne(() => MediaEntity, (media) => media.notifications, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'mediaId',
  })
  media: MediaEntity | null;

  @ManyToOne(() => UserEntity, (user) => user.notifications, { nullable: true })
  user: UserEntity | null;

  @Column({ type: 'enum', enum: NotificationTypeEnum, nullable: true })
  type: NotificationTypeEnum | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  isSeen: boolean | null;
}
