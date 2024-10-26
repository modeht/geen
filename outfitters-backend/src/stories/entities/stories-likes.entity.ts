import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	Column,
	Unique,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { StoryEntity } from './story.entity';

@Entity({
	name: 'stories_liked_by_users',
})
@Unique(['userId', 'storyId'])
export class StoryLikesEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.likedStories, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'userId' })
	user: UserEntity;

	@ManyToOne(() => StoryEntity, (story) => story.likedByUsers, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'storyId' })
	story: StoryEntity;

	@Column()
	userId: number;

	@Column()
	storyId: number;
}
