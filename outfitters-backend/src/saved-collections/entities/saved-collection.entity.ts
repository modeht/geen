import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { SavedCollectionItemEntity } from './saved-collection-item.entity';

export const DEFAULT_COLLECTION_NAME = 'default collection';

@Entity({ name: 'saved_collections' })
export class SavedCollectionEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'varchar',
		nullable: false,
		default: DEFAULT_COLLECTION_NAME,
	})
	name: string | null;

	@OneToMany(() => SavedCollectionItemEntity, (item) => item.savedCollection, {
		cascade: true,
	})
	items: SavedCollectionItemEntity[];

	@ManyToOne(() => UserEntity, (user) => user.savedCollections)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;

	@Column()
	userId: number;
}
