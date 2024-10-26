import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';
import { MessageEntity } from '../../messages/entities/message.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({
	name: 'conversations',
})
@Unique(['from', 'to'])
export class ConversationEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'boolean', default: false })
	isSupport: boolean;

	@ManyToOne(() => UserEntity, (user) => user.initiatedConversations)
	@JoinColumn({
		name: 'fromId',
	})
	from: UserEntity;

	@ManyToOne(() => UserEntity, (user) => user.receivedConversations, { nullable: true })
	@JoinColumn({
		name: 'toId',
	})
	to: UserEntity;

	@OneToMany(() => MessageEntity, (message) => message.conversation, {
		cascade: true,
		nullable: true,
	})
	messages: MessageEntity[] | null;

	@Column({ type: 'boolean', default: false })
	archivedByFrom: boolean;

	@Column({ type: 'boolean', default: false })
	archivedByTo: boolean;

	@Column()
	fromId: number;

	@Column({ nullable: true })
	toId: number;

	@Column({ type: 'boolean', default: false })
	isCollaboration: boolean;
}
