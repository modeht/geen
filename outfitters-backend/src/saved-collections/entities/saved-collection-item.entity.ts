import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { SavedCollectionEntity } from './saved-collection.entity';

@Entity({ name: 'saved_collection_items' })
@Unique(['savedCollectionId', 'userId', 'postId'])
@Unique(['savedCollectionId', 'userId', 'productId'])
export class SavedCollectionItemEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => SavedCollectionEntity, (collection) => collection.items, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'savedCollectionId' })
	savedCollection: SavedCollectionEntity;

	@ManyToOne(() => ProductEntity, (product) => product.savedInCollections)
	@JoinColumn({ name: 'productId' })
	product: ProductEntity;

	@ManyToOne(() => PostEntity, (post) => post.savedInCollections)
	@JoinColumn({ name: 'postId' })
	post: PostEntity;

	@Column()
	savedCollectionId: number;

	@Column({ nullable: true })
	productId: number;

	@Column({ nullable: true })
	postId: number;

	// denormalized for efficient existence checks
	@Column({ nullable: true })
	userId: number;
}
