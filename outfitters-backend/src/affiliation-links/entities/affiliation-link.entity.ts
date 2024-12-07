import { ProductEntity } from 'src/products/entities/product.entity';
import { TaggedProductEntity } from 'src/products/entities/tagged-product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';
import { AffiliationLinkTrackingEntity } from './affiliation-link-tracking.entity';
import { CartItemsEntity } from '../../carts/entities/cart-item.entity';

@Entity({ name: 'affiliation_links' })
@Unique(['shopperId', 'productId', 'isDisabled'])
export class AffiliationLinkEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'boolean', default: false })
	isDisabled: boolean = false;

	// Should this be auto-generated?
	@Column({ type: 'text', nullable: false })
	url: string;

	@OneToMany(() => TaggedProductEntity, (taggedProduct) => taggedProduct.affiliationLink)
	taggedProducts: TaggedProductEntity[] | null;

	@OneToMany(() => CartItemsEntity, (cartItem) => cartItem.affiliationLink)
	cartItems: CartItemsEntity[] | null;

	@OneToMany(
		() => AffiliationLinkTrackingEntity,
		(affiliationLinkInteraction) => affiliationLinkInteraction.affiliationLink,
	)
	affiliationLinkTracking: AffiliationLinkTrackingEntity[] | null;

	@ManyToOne(
		() => ShopperProfileEntity,
		(shopperProfile) => shopperProfile.affiliationLinks,
	)
	@JoinColumn({ name: 'shopperId' })
	shopperProfile: ShopperProfileEntity;

	@ManyToOne(() => ProductEntity, (product) => product.affiliationLinks)
	product: ProductEntity;

	@Column()
	productId: number;

	@Column()
	shopperId: number;
}
