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
import { MediaEntity } from '../../media/entities/media.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';
import { ProductEntity } from './product.entity';

@Entity({
	name: 'product_reviews',
})
export class ProductReviewEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => ShopperProfileEntity, (shopperProfile) => shopperProfile.reviews, {
		nullable: true,
	})
	@JoinColumn({
		name: 'shopperId',
	})
	shopperProfile: ShopperProfileEntity | null;

	@Column({
		type: 'float',
		nullable: true,
	})
	stars: number | null;

	@Column({
		type: 'text',
		nullable: true,
	})
	comment: string | null;

	@OneToMany(() => MediaEntity, (media) => media.review, { nullable: true })
	media?: MediaEntity[] | null;

	@ManyToOne(() => ProductEntity, (product) => product.ratings, {
		nullable: true,
	})
	@JoinColumn({
		name: 'productId',
	})
	product: ProductEntity | null;

	@Column({ nullable: true })
	productId: number;

	@Column({ nullable: true })
	shopperId: number;
}
