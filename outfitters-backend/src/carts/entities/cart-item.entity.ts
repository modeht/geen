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
import { CartEntity } from './cart.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { AffiliationLinkEntity } from '../../affiliation-links/entities/affiliation-link.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'cart_products' })
@Unique(['cartId', 'productId', 'variantId'])
export class CartItemsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'int', nullable: true })
	quantity: number | null;

	@ManyToOne(() => CartEntity, (cart) => cart.items, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'cartId' })
	cart: CartEntity;

	@ManyToOne(() => ProductEntity, (product) => product.carts, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'productId' })
	product: ProductEntity;

	@ManyToOne(() => ProductVariantEntity, (variant) => variant.carts, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'variantId' })
	variant: ProductVariantEntity;

	@ManyToOne(() => AffiliationLinkEntity, (affiliationLink) => affiliationLink.cartItems)
	@JoinColumn({ name: 'affiliationLinkId' })
	affiliationLink: AffiliationLinkEntity | null;

	@Column()
	cartId: number;

	@Column()
	productId: number;

	@Column({ nullable: true })
	variantId: number;

	@Column({ nullable: true })
	affiliationLinkId: number;

	// quantity * product.price
	totalPrice: number;

	// The total price of the product after applying the discount
	totalDiscountedPrice: number;

	// Simple flag to check if the product has a promotionCodeApplied
	promoCodeApplied: boolean;

	@Exclude()
	appliedpromotionsIds: number[] = [];
}
