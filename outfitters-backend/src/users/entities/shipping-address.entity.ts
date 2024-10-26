import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';
import { ShopperProfileEntity } from './shopper-profile.entity';

@Entity({
	name: 'shipping_addresses',
})
export class ShippingAddressEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	@Column({ type: 'boolean', default: false })
	isDefault: boolean;

	@Column({ type: 'varchar', nullable: true })
	name: string;

	@Column({ type: 'varchar', nullable: true })
	@Index()
	country: string;

	@Column({ type: 'varchar', nullable: true })
	@Index()
	city: string;

	@Column({ type: 'varchar', nullable: true })
	street: string;

	@Column({ type: 'varchar', nullable: true })
	apartment: string;

	@Column({ type: 'varchar', nullable: true })
	address: string;

	@Column({ type: 'varchar', nullable: true })
	floor: string;

	@Column({ type: 'varchar', nullable: true })
	building: string;

	@Column({ type: 'varchar', nullable: true })
	latitude: string;

	@Column({ type: 'varchar', nullable: true })
	longitude: string;

	@OneToMany(() => OrderEntity, (order) => order.shippingAddress)
	orders?: OrderEntity[] | null;

	@ManyToOne(
		() => ShopperProfileEntity,
		(shopperProfileEntity) => shopperProfileEntity.addresses,
	)
	@JoinColumn({
		name: 'shopperId',
	})
	shopperProfile: ShopperProfileEntity;

	@Column({ nullable: true })
	shopperId: number;
}
