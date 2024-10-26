import { CommentEntity } from 'src/comments/entities/comment.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
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
import { UserEntity } from '../../users/entities/user.entity';
import { PostLikesEntity } from './posts-likes.entity';
import { SavedCollectionItemEntity } from '../../saved-collections/entities/saved-collection-item.entity';

@Entity({ name: 'posts' })
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'text',
		nullable: true,
	})
	caption: string | null;

	@OneToMany(() => MediaEntity, (media) => media.post, {
		cascade: false,
		nullable: false,
	})
	media: MediaEntity[] | null;

	@OneToOne(() => MediaEntity, (media) => media.postThumbnail, {})
	@JoinColumn({ name: 'thumbnailId' })
	thumbnail: MediaEntity | null;

	@OneToMany(() => TaggedProductEntity, (taggedProduct) => taggedProduct.post, {
		cascade: true,
		nullable: true,
	})
	taggedProducts: TaggedProductEntity[] | null;

	@ManyToOne(() => UserEntity, (user) => user.posts, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'postedById' })
	@Index()
	postedBy: UserEntity;

	@Column()
	postedById: number;

	@ManyToMany(() => UserEntity, (user) => user.taggedInPosts, {
		cascade: false,
	})
	@JoinTable({
		name: 'posts_tagged_users',
		joinColumn: {
			name: 'postId',
		},
		inverseJoinColumn: {
			name: 'userId',
		},
	})
	taggedUsers: UserEntity[] | null;

	@OneToMany(() => PostLikesEntity, (like) => like.post)
	likedByUsers: PostLikesEntity[] | null;

	@OneToMany(() => CommentEntity, (comment) => comment.post, {
		cascade: false,
	})
	comments: CommentEntity[] | null;

	@OneToMany(() => MessageEntity, (message) => message.post, {
		cascade: false,
	})
	shares: MessageEntity[] | null;

	@OneToMany(() => SavedCollectionItemEntity, (item) => item.post)
	savedInCollections: SavedCollectionItemEntity[] | null;

	@Column({ nullable: true })
	thumbnailId: number | null;

	@Column({
		type: 'int',
		default: 0,
	})
	likesCount: number = 0;

	@Column({
		type: 'int',
		default: 0,
	})
	commentsCount: number = 0;

	@Column({
		type: 'int',
		default: 0,
	})
	taggedProductsCount: number = 0;

	@Column({
		type: 'int',
		default: 0,
	})
	taggedUsersCount: number = 0;

	/**
	 * @description An attribute that is not stored in the database, but is set by the query to indicate if the post is liked by the current user, Virtual column is being used as a workaround to be able to set value from the QueryBuilder, but it most be also known that this "query" (query: () => `FALSE`) will not run unless the column explicitly selected)
	 * example: manager.findOne(PostEntity,{select: ['id', 'likesCount']}) => the query will run
	 * example: manager.findOne(PostEntity,{where,relations}) => the query will not run
	 */
	@VirtualColumn({ query: () => `FALSE` })
	isLiked?: boolean = null;
}
