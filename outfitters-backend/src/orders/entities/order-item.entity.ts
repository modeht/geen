import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { BrandOrderEntity } from './brand-orders.entity';
import { PromotionEntity } from '../../promotions/entities/promotion.entity';
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'int', nullable: true })
	quantity: number | null;

	@Column({ type: 'float', nullable: true })
	unitSalePrice: number | null;

	@Column({ type: 'float', nullable: true })
	unitPurchasePrice: number | null;

	@Column({ type: 'float', nullable: true })
	totalSalePrice: number | null;

	@Column({ type: 'float', nullable: true })
	totalPurchasePrice: number | null;

	@ManyToOne(() => BrandOrderEntity, (brandOrder) => brandOrder.items)
	@JoinColumn({ name: 'brandOrderId' })
	brandOrder: BrandOrderEntity;

	@ManyToOne(() => ProductVariantEntity, (variant) => variant.orderItems)
	@JoinColumn({ name: 'variantId' })
	variant: ProductVariantEntity;

	@ManyToOne(() => ProductEntity, (product) => product.orderItems)
	@JoinColumn({ name: 'productId' })
	product: ProductEntity;

	@ManyToOne(() => PromoCodeEntity, (promoCode) => promoCode.orderItems)
	@JoinColumn({ name: 'promoCodeId' })
	appliedPromoCode: PromoCodeEntity;

	@ManyToMany(() => PromotionEntity, (promotion) => promotion.orderItems)
	@JoinTable({
		name: 'order_items_promotions',
		joinColumn: { name: 'orderItemId' },
		inverseJoinColumn: { name: 'promotionId' },
	})
	appliedPromotions: PromotionEntity[];

	@Column()
	brandOrderId: number;

	@Column()
	productId: number;

	@Column({ nullable: true })
	variantId: number;

	@Column({ nullable: true })
	promoCodeId: number;
}
