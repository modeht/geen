import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VirtualColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';
import { CartEntity } from '../../carts/entities/cart.entity';
import { OrderItemEntity } from '../../orders/entities/order-item.entity';
import { PromotionStatusEnum, PromotionTypeEnum } from './enums';

@Entity({ name: 'promo_codes' })
export class PromoCodeEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;

	@Column({ type: 'varchar', nullable: false, unique: true })
	code: string;

	@Column({ type: 'varchar', nullable: false })
	title: string;

	@Column({ type: 'float', nullable: true, default: 0 })
	minPurchaseAmount: number | null;

	@Column({ type: 'int', nullable: true })
	perUserLimit: number | null;

	@Column({ type: 'int', nullable: true })
	totalLimit: number | null;

	@Column({ type: 'date' })
	start: Date;

	@Column({ type: 'date' })
	end: Date;

	@Column({ type: 'float', nullable: false, default: 0 })
	discountPercentage: number;

	@Column({
		type: 'enum',
		enum: PromotionTypeEnum,
		nullable: false,
		default: PromotionTypeEnum.Discount,
	})
	type: PromotionTypeEnum;

	@Column({
		type: 'enum',
		enum: PromotionStatusEnum,
		nullable: false,
		default: PromotionStatusEnum.Active,
	})
	status: PromotionStatusEnum;

	@OneToMany(() => CartEntity, (cart) => cart.promoCode)
	carts: CartEntity[];

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.appliedPromoCode)
	orderItems: OrderItemEntity[];

	@ManyToOne(() => BrandProfileEntity, (brandProfile) => brandProfile.promoCodes)
	@JoinColumn({ name: 'brandId' })
	brand: BrandProfileEntity;

	@ManyToOne(() => ShopperProfileEntity, (shopperProfile) => shopperProfile.promoCodes)
	@JoinColumn({ name: 'shopperId' })
	shopperProfile: ShopperProfileEntity;

	@ManyToMany(() => ProductEntity, (product) => product.promoCodes)
	@JoinTable({
		name: 'promo_codes_products',
		joinColumn: { name: 'promoCodeId' },
		inverseJoinColumn: { name: 'productId' },
	})
	products: ProductEntity[];

	@Column({ nullable: true })
	brandId: number;

	@Column({ nullable: true })
	shopperId: number;

	@VirtualColumn({ query: () => 'SELECT 0' })
	ussageCount: number;

	@VirtualColumn({ query: () => 'SELECT 0' })
	totalMoneyDeducted: number;
}
