import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum searchMode {
	Discover = 'discover',
	Message = 'message',
}

@Entity({
	name: 'recent_searches',
})
export class RecentSearchesEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ type: 'varchar', nullable: true })
	keyword: string | null;

	@Column({
		type: 'enum',
		enum: searchMode,
	})
	mode: searchMode;

	@ManyToOne(() => UserEntity, (user) => user.recentSearches)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;

	@Column()
	userId: number;
}
