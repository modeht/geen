import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
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
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VirtualColumn,
} from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { StoryLikesEntity } from './stories-likes.entity';

@Entity({ name: 'stories' })
export class StoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	background: string | null;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	text: string | null;

	@OneToOne(() => MediaEntity, (media) => media.story, {
		cascade: false,
		nullable: true,
	})
	@JoinColumn({
		name: 'mediaId',
	})
	media: MediaEntity | null;

	@OneToMany(() => TaggedProductEntity, (taggedProduct) => taggedProduct.story, {
		cascade: true,
		nullable: true,
	})
	taggedProducts: TaggedProductEntity[] | null;

	@ManyToOne(() => UserEntity, (user) => user.stories, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'postedById' })
	@Index()
	postedBy: UserEntity;

	@ManyToMany(() => UserEntity, (user) => user.taggedInStories, {
		cascade: false,
	})
	@JoinTable({
		name: 'stories_tagged_users',
		joinColumn: {
			name: 'storyId',
		},
		inverseJoinColumn: {
			name: 'userId',
		},
	})
	taggedUsers: UserEntity[] | null;

	@OneToMany(() => StoryLikesEntity, (like) => like.story)
	likedByUsers: StoryLikesEntity[] | null;

	@OneToMany(() => MessageEntity, (message) => message.story, {
		cascade: false,
	})
	shares: MessageEntity[] | null;

	@Column()
	postedById: number;

	@Column({
		type: 'int',
		default: 0,
	})
	taggedProductsCount: number;

	@Column({
		type: 'int',
		default: 0,
	})
	taggedUsersCount: number;

	@VirtualColumn({ query: () => `FALSE` })
	isLiked?: boolean = null;

	@VirtualColumn({ query: () => `FALSE` })
	isViewed?: boolean = null;
}
