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
import { OrderEntity } from './order.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';
import { OrderItemEntity } from './order-item.entity';

export enum OrderStatusEnum {
	Placed = 'placed',
	InProgress = 'in_progress',
	ReadyForDelivery = 'ready_for_delivery',
	OutForDelivery = 'out_for_delivery',
	Delivered = 'delivered',
	Cancelled = 'cancelled',
}

@Entity({ name: 'brand_orders' })
export class BrandOrderEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'enum',
		enum: OrderStatusEnum,
		nullable: true,
		default: OrderStatusEnum.Placed,
	})
	status: OrderStatusEnum = OrderStatusEnum.Placed;

	@Column({ type: 'float', nullable: true })
	totalSalePrice: number | null;

	@Column({ type: 'float', nullable: true })
	totalPurchasePrice: number | null;

	@Column({ type: 'float', nullable: true })
	shippingFees: number | null;

	@Column({ type: 'float', nullable: true })
	rating: number | null;

	@Column({ type: 'text', nullable: true })
	review: string | null;

	@Column({ type: 'timestamptz', nullable: true })
	expectedDeliveryDate: Date | null;

	@Column({ type: 'timestamptz', nullable: true })
	acceptedAt: Date | null;

	@Column({ type: 'timestamptz', nullable: true })
	shippedAt: Date | null;

	@Column({ type: 'timestamptz', nullable: true })
	deliveredAt: Date | null;

	@Column({ type: 'timestamptz', nullable: true })
	cancelledAt: Date | null;

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.brandOrder, {
		cascade: true,
	})
	items: OrderItemEntity[];

	@ManyToOne(() => BrandProfileEntity, (brand) => brand.brandOrders)
	@JoinColumn({ name: 'brandId' })
	brand: BrandProfileEntity;

	@ManyToOne(() => OrderEntity, (order) => order.brandOrders)
	@JoinColumn({ name: 'orderId' })
	order: OrderEntity;

	@Column()
	orderId: number;

	@Column()
	brandId: number;
}
