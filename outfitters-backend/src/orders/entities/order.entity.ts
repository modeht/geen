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
import { ShippingAddressEntity } from '../../users/entities/shipping-address.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';
import { CartEntity } from '../../carts/entities/cart.entity';
import { BrandOrderEntity } from './brand-orders.entity';

export enum OrderPaymentMethod {
	CARD = 'card',
	CARD_ON_DELIVERY = 'card_on_delivery',
	CASH_ON_DELIVERY = 'cash_on_delivery',
}
export enum OrderPaymentStatusEnum {
	Pending = 'pending',
	Processing = 'processing',
	Paid = 'paid',
	Failed = 'failed',
	Refunded = 'refunded',
	PartiallyRefunded = 'partially_refunded',
}

@Entity({
	name: 'orders',
})
export class OrderEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'json', nullable: true })
	transactions: Record<string, any> | null;

	@Column({ type: 'enum', enum: OrderPaymentMethod })
	paymentMethod: OrderPaymentMethod;

	@Column({
		type: 'enum',
		enum: OrderPaymentStatusEnum,
		default: OrderPaymentStatusEnum.Pending,
		nullable: true,
	})
	paymentStatus: OrderPaymentStatusEnum | null;

	@Column({ type: 'float', nullable: true })
	totalSalePrice: number | null;

	@Column({ type: 'float', nullable: true })
	totalPurchasePrice: number | null;

	@Column({ type: 'float', nullable: true })
	totalShippingFees: number | null;

	@OneToOne(() => CartEntity, (cart) => cart.order)
	@JoinColumn({ name: 'cartId' })
	cart: CartEntity;

	@OneToMany(() => BrandOrderEntity, (brandOrder) => brandOrder.order, {
		cascade: true,
	})
	brandOrders: BrandOrderEntity[];

	@ManyToOne(() => ShippingAddressEntity, (shippingAddress) => shippingAddress.orders, {
		cascade: true,
	})
	@JoinColumn({ name: 'shippingAddressId' })
	shippingAddress: ShippingAddressEntity;

	@ManyToOne(() => ShopperProfileEntity, (shopperProfile) => shopperProfile.orders)
	@JoinColumn({
		name: 'shopperId',
	})
	shopperProfile: ShopperProfileEntity;

	@Column({ nullable: true })
	cartId: number;

	@Column({ nullable: true })
	shippingAddressId: number;

	@Column({ nullable: true })
	shopperId: number;
}
