import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Tree,
	TreeChildren,
	TreeParent,
	UpdateDateColumn,
	VirtualColumn,
} from 'typeorm';
import { MessageEntity } from '../../messages/entities/message.entity';

@Entity({ name: 'comments' })
@Tree('closure-table', {
	closureTableName: 'comments',
	ancestorColumnName: () => 'commentId',
	descendantColumnName: () => 'replyId',
})
export class CommentEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'text',
		nullable: false,
	})
	content: string;

	@ManyToOne(() => UserEntity, (user) => user.comments, { eager: true })
	@JoinColumn({ name: 'userId' })
	commentor: UserEntity;

	@ManyToOne(() => PostEntity, (post) => post.comments, {
		nullable: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'postId' })
	post: PostEntity;

	@TreeChildren({ cascade: true })
	replies?: CommentEntity[] | null;

	@TreeParent({ onDelete: 'CASCADE' })
	replyTo?: CommentEntity | null;

	@Column({ default: 0, nullable: true })
	level: number;

	@OneToMany(() => NotificationEntity, (notification) => notification.comment, {
		nullable: true,
	})
	notifications: NotificationEntity[] | null;

	@OneToMany(() => MessageEntity, (message) => message.comment)
	messages: MessageEntity[] | null;

	@Column({ nullable: true })
	userId: number;

	@Column({ nullable: true })
	replyToId?: number;

	@Column({ nullable: true })
	postId?: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@VirtualColumn({ query: () => 'False' })
	repliesDepth: number;
}
