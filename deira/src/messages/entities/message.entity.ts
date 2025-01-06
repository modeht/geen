import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConversationEntity } from '../../conversations/entities/conversation.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { AdEntity } from '../../ads/entities/ad.entity';

@Entity({
  name: 'messages',
})
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.messagesReceived)
  receiver: UserEntity;

  @Column({ type: 'text', nullable: true })
  content: string | null;

  @Column({ type: 'boolean', nullable: true, default: false })
  isRead: boolean | null = false;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  conversation: ConversationEntity;

  @ManyToOne(() => AdEntity, (ad) => ad.messages, { nullable: true })
  @JoinColumn({
    name: 'adId',
  })
  ad: AdEntity | null;

  @ManyToMany(() => MediaEntity, (media) => media.messages, { nullable: true })
  @JoinTable({
    name: 'message_media',
    joinColumn: {
      name: 'mediaId',
    },
    inverseJoinColumn: {
      name: 'messageId',
    },
  })
  media: MediaEntity[] | null;
}
