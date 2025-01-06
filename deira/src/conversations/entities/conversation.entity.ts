import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { MessageEntity } from '../../messages/entities/message.entity';

@Entity({
  name: 'conversations',
})
export class ConversationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.initiatedConversations)
  @JoinColumn({
    name: 'initiatorId',
  })
  initiator: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.targetedConversations)
  @JoinColumn({
    name: 'targetId',
  })
  target: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.conversation)
  messages: MessageEntity[] | null;

  latestMessage?: MessageEntity | null;
}
