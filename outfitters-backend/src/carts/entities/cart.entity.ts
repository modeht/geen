import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';
import { CartItemsEntity } from './cart-item.entity';
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity';
import { OrderEntity } from '../../orders/entities/order.entity';

export enum CartStatus {
	// The cart is active and can be updated
	ACTIVE = 'active',
	// The cart has been completed and the order has been placed
	COMPLETED = 'completed',
}

@Entity({ name: 'carts' })
export class CartEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'enum', enum: CartStatus, default: CartStatus.ACTIVE })
	status: CartStatus;

	@OneToOne(() => OrderEntity, (order) => order.cart)
	order: OrderEntity;

	@OneToMany(() => CartItemsEntity, (cartItems) => cartItems.cart, {
		cascade: true,
	})
	items: CartItemsEntity[];

	@ManyToOne(() => ShopperProfileEntity, (shopperProfile) => shopperProfile.carts)
	@JoinColumn({ name: 'shopperId' })
	shopperProfile: ShopperProfileEntity;

	@ManyToOne(() => PromoCodeEntity, (promoCode) => promoCode.carts)
	@JoinColumn({ name: 'promoCodeId' })
	promoCode: PromoCodeEntity;

	@Column({ nullable: true })
	promoCodeId: number | null;

	@Column({ nullable: true })
	shopperId: number | null;
}
