import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from './post.entity';

@Entity({
	name: 'posts_liked_by_users',
})
@Unique(['userId', 'postId'])
export class PostLikesEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.likedPosts, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'userId' })
	user: UserEntity;

	@ManyToOne(() => PostEntity, (post) => post.likedByUsers, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'postId' })
	post: PostEntity;

	@Column()
	userId: number;

	@Column()
	postId: number;
}
