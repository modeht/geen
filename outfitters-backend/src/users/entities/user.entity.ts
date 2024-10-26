import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AffiliationLinkTrackingEntity } from 'src/affiliation-links/entities/affiliation-link-tracking.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { StoryEntity } from 'src/stories/entities/story.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VirtualColumn,
} from 'typeorm';
import { LanguageEnum } from '../../../lib/enums';
import { Role } from '../../auth/types';
import { ConversationEntity } from '../../conversations/entities/conversation.entity';
import { DEFAULT_LANG } from '../../globals/constants';
import { MessageEntity } from '../../messages/entities/message.entity';
import { PostLikesEntity } from '../../posts/entities/posts-likes.entity';
import { SavedCollectionEntity } from '../../saved-collections/entities/saved-collection.entity';
import { RecentSearchesEntity } from '../../search/entities/recent-searches.entity';
import { BrandProfileEntity } from './brand-profile.entity';
import { ShopperProfileEntity } from './shopper-profile.entity';
import { StoryLikesEntity } from '../../stories/entities/stories-likes.entity';

export enum AccountStatus {
	Active = 'active',
	Inactive = 'inactive',
	Suspended = 'suspended',
}

@Entity({
	name: 'users',
})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn({ select: false })
	updatedAt: Date;

	// TODO: add logic for filtering blocked/suspended users everywhere also users blocked by me
	@Column({
		type: 'enum',
		enum: AccountStatus,
		default: AccountStatus.Active,
		select: false,
		nullable: true,
	})
	status: AccountStatus = AccountStatus.Active;

	@Column({ type: 'varchar', nullable: true, select: false })
	email: string | null;

	@Column({ type: 'varchar', nullable: true, select: false })
	@Index()
	phone: string | null;

	@Column({ type: 'varchar', nullable: true, select: false })
	@Exclude()
	password: string | null;

	@Column({ type: 'varchar', nullable: true, select: false })
	@Index()
	@Exclude()
	firebaseId: string | null;

	@Column({ type: 'boolean', nullable: true, default: false, select: false })
	emailVerified: boolean | null;

	@Column({ type: 'boolean', nullable: true, default: false, select: false })
	isGoogleSignin: boolean | null;

	@Column({ type: 'boolean', nullable: true, default: false, select: false })
	isAppleSignin: boolean | null;

	@Column({ type: 'enum', enum: LanguageEnum, default: DEFAULT_LANG, select: false })
	defaultLang: LanguageEnum = DEFAULT_LANG;

	@OneToOne(() => ShopperProfileEntity, (shopperProfile) => shopperProfile.user, {
		cascade: true,
		eager: true,
	})
	@ApiHideProperty()
	shopperProfile: ShopperProfileEntity | null;

	@OneToOne(() => BrandProfileEntity, (brandProfile) => brandProfile.user, {
		cascade: true,
		eager: true,
	})
	@ApiHideProperty()
	brandProfile: BrandProfileEntity | null;

	@OneToMany(() => CommentEntity, (comment) => comment.commentor)
	@ApiHideProperty()
	comments: CommentEntity[] | null;

	@OneToMany(
		() => AffiliationLinkTrackingEntity,
		(affiliationLinkTracking) => affiliationLinkTracking.user,
	)
	@ApiHideProperty()
	affiliationLinkTracking: AffiliationLinkTrackingEntity[] | null;

	@OneToMany(() => NotificationEntity, (notification) => notification.user)
	@ApiHideProperty()
	notifications: NotificationEntity[];

	@OneToMany(() => ConversationEntity, (conversation) => conversation.from, {
		nullable: true,
		cascade: true,
	})
	@ApiHideProperty()
	initiatedConversations: ConversationEntity[] | null;

	@OneToMany(() => ConversationEntity, (conversation) => conversation.to, {
		nullable: true,
		cascade: true,
	})
	@ApiHideProperty()
	receivedConversations: ConversationEntity[] | null;

	@OneToMany(() => MessageEntity, (message) => message.from, {
		nullable: true,
		cascade: true,
	})
	@ApiHideProperty()
	sentMessages: MessageEntity[] | null;

	@OneToMany(() => MessageEntity, (message) => message.to, {
		nullable: true,
		cascade: true,
	})
	@ApiHideProperty()
	receivedMessages: MessageEntity[] | null;

	@OneToMany(() => PostEntity, (post) => post.postedBy, {
		nullable: true,
		cascade: true,
	})
	@ApiHideProperty()
	posts: PostEntity[] | null;

	@OneToMany(() => StoryEntity, (story) => story.postedBy)
	@ApiHideProperty()
	stories: StoryEntity[] | null;

	@OneToMany(() => SavedCollectionEntity, (collection) => collection.user, {
		cascade: true,
	})
	@ApiHideProperty()
	savedCollections: SavedCollectionEntity[] | null;

	@OneToMany(() => RecentSearchesEntity, (recentSearch) => recentSearch.user)
	@ApiHideProperty()
	recentSearches: RecentSearchesEntity[] | null;

	@OneToMany(() => PostLikesEntity, (like) => like.user)
	@ApiHideProperty()
	likedPosts: PostLikesEntity;

	@OneToMany(() => StoryLikesEntity, (like) => like.user)
	@ApiHideProperty()
	likedStories: StoryLikesEntity;

	@ManyToMany(() => PostEntity, (post) => post.taggedUsers)
	@ApiHideProperty()
	taggedInPosts: PostEntity[] | null;

	@ManyToMany(() => StoryEntity, (story) => story.taggedUsers)
	@ApiHideProperty()
	taggedInStories: StoryEntity[] | null;

	@ManyToMany(() => UserEntity, (user) => user.follows, { nullable: true })
	@ApiHideProperty()
	following: UserEntity[] | null;

	@ManyToMany(() => UserEntity, (user) => user.following, { nullable: true })
	@ApiHideProperty()
	@JoinTable({
		name: 'user_follows',
		joinColumn: {
			name: 'followerId',
		},
		inverseJoinColumn: {
			name: 'followingId',
		},
	})
	follows: UserEntity[] | null;

	@ManyToMany(() => UserEntity, (user) => user.blockedUsers, {
		nullable: true,
		cascade: false,
	})
	@ApiHideProperty()
	blockedBy: UserEntity[] | null;

	@ManyToMany(() => UserEntity, (user) => user.blockedBy, { nullable: true })
	@ApiHideProperty()
	@JoinTable({
		name: 'user_blocks',
		joinColumn: {
			name: 'blockerId',
		},
		inverseJoinColumn: {
			name: 'blockedId',
		},
	})
	blockedUsers: UserEntity[] | null;

	@VirtualColumn({ query: () => `FALSE` })
	isFollowing?: boolean = null;

	@VirtualColumn({ query: () => `FALSE` })
	isBlockedBy?: boolean = null;

	@VirtualColumn({ query: () => `FALSE` })
	followersCount?: number = null;
	//
	// Manually set via auth service during signIn
	role?: Role | null;
}
