import { NotificationEntity } from 'src/notifications/entities/notification.entity';
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
	OneToMany,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import { OrderItemEntity } from '../../orders/entities/order-item.entity';
import { PromotionStatusEnum, PromotionTargetEnum, PromotionTypeEnum } from './enums';
import { SeasonalPromotionEntity } from './seasonal-promotion.entity';

@Entity({
	name: 'promotions',
})
export class PromotionEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	title: string;

	@Column({
		type: 'enum',
		enum: PromotionTypeEnum,
		nullable: false,
		default: PromotionTypeEnum.Discount,
	})
	type: PromotionTypeEnum;

	@Column({
		type: 'float',
		nullable: false,
		default: 0,
	})
	discountPercentage: number;

	@Column({
		type: 'float',
		nullable: true,
		default: 0,
	})
	minPurchaseAmount: number | null;

	@Column({ type: 'date' })
	start: Date;

	@Column({ type: 'date' })
	end: Date;

	@Column({
		type: 'enum',
		enum: PromotionTargetEnum,
		nullable: false,
		default: PromotionTargetEnum.Loyal,
	})
	target: PromotionTargetEnum;

	@Column({
		type: 'enum',
		enum: PromotionStatusEnum,
		nullable: false,
		default: PromotionStatusEnum.Active,
	})
	status: PromotionStatusEnum;

	@OneToMany(() => NotificationEntity, (notification) => notification.promotion)
	notifications: NotificationEntity[] | null;

	@ManyToOne(() => BrandProfileEntity, (brand) => brand.promotions, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'brandId' })
	brand: BrandProfileEntity;

	@ManyToOne(
		() => SeasonalPromotionEntity,
		(seasonalPromotion) => seasonalPromotion.promotions,
	)
	@JoinColumn({ name: 'seasonalPromotionId' })
	seasonalPromotion: SeasonalPromotionEntity;

	@ManyToMany(() => ProductEntity, (product) => product.promotions, {
		nullable: false,
	})
	@JoinTable({
		name: 'promotions_products',
		joinColumn: { name: 'promotionId' },
		inverseJoinColumn: { name: 'productId' },
	})
	products: ProductEntity[] | null;

	@ManyToMany(() => OrderItemEntity, (orderItem) => orderItem.appliedPromoCode)
	orderItems: OrderItemEntity[] | null;

	@Column({ type: 'boolean', default: false })
	isDeleted: boolean;

	@Column({ nullable: true })
	seasonalPromotionId: number | null;

	@Column()
	brandId: number;
}
