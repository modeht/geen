import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity';
import { CommentEntity } from '../../comments/entities/comment.entity';
import { ConversationEntity } from '../../conversations/entities/conversation.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { UserEntity } from '../../users/entities/user.entity';

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

	@Column({ type: 'timestamptz', nullable: true })
	readAt: Date;

	@Column({ type: 'text', nullable: true })
	content: string | null;

	@OneToMany(() => MediaEntity, (media) => media.message, {
		nullable: true,
		cascade: true,
	})
	media: MediaEntity[] | null;

	@Column({ type: 'varchar', nullable: true })
	reaction: string | null;

	@OneToOne(() => CollaborationEntity, (collaboration) => collaboration.message, {
		nullable: true,
	})
	@JoinColumn({ name: 'collaborationId' })
	collaboration: CollaborationEntity | null;

	@ManyToOne(() => PostEntity, (post) => post.shares)
	@JoinColumn({ name: 'postId' })
	post: PostEntity;

	@ManyToOne(() => StoryEntity, (story) => story.shares)
	@JoinColumn({ name: 'storyId' })
	story: StoryEntity;

	@ManyToOne(() => ProductEntity, (product) => product.messages)
	@JoinColumn({ name: 'productId' })
	product: ProductEntity;

	@ManyToOne(() => ConversationEntity, (conversation) => conversation.messages, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE',
		nullable: false,
	})
	@JoinColumn({
		name: 'conversationId',
	})
	conversation: ConversationEntity;

	@ManyToOne(() => UserEntity, (user) => user.sentMessages)
	@JoinColumn({
		name: 'fromId',
	})
	from: UserEntity;

	@ManyToOne(() => UserEntity, (user) => user.receivedMessages, { nullable: true })
	@JoinColumn({
		name: 'toId',
	})
	to: UserEntity;

	@ManyToOne(() => CommentEntity, (comment) => comment.messages, { nullable: true })
	@JoinColumn({
		name: 'commentId',
	})
	comment: CommentEntity | null;

	@Column()
	fromId: number;

	@Column({ nullable: true })
	toId: number;

	@Column()
	conversationId: number;

	@Column({ nullable: true })
	collaborationId: number | null;

	@Column({ nullable: true })
	postId: number | null;

	@Column({ nullable: true })
	storyId: number | null;

	@Column({ nullable: true })
	commentId: number | null;

	@Column({ nullable: true })
	productId: number | null;
}
