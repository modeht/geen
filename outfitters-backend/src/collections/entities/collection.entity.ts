import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'collections' })
export class CollectionEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	@Index()
	name: string | null;

	@Column({ type: 'boolean', default: false })
	isFeatured: boolean = false;

	@Column({ type: 'boolean', default: true })
	isPublic: boolean = true;

	@OneToOne(() => MediaEntity, (media) => media.collectionCover, {
		nullable: true,
	})
	@JoinColumn({
		name: 'coverId',
	})
	cover: MediaEntity | null;

	@ManyToOne(() => BrandProfileEntity, (brandProfile) => brandProfile.collections, {
		nullable: true,
	})
	@JoinColumn({
		name: 'brandId',
	})
	brand: BrandProfileEntity | null;

	@ManyToMany(() => ProductEntity, (product) => product.collections, {
		nullable: true,
		cascade: true,
	})
	@JoinTable({
		name: 'collections_products',
		joinColumn: {
			name: 'collectionId',
		},
		inverseJoinColumn: {
			name: 'productId',
		},
	})
	products: ProductEntity[] | null;

	@Column({ nullable: true })
	brandId: number | null;
}
