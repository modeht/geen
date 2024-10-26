import { AffiliationLinkEntity } from 'src/affiliation-links/entities/affiliation-link.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import { BrandProfileEntity } from 'src/users/entities/brand-profile.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VirtualColumn,
} from 'typeorm';
import { CollectionEntity } from '../../collections/entities/collection.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { OrderItemEntity } from '../../orders/entities/order-item.entity';
import { PromotionEntity } from '../../promotions/entities/promotion.entity';
import { ProductOptionEntity } from './product-option.entity';
import { ProductReviewEntity } from './product-review.entity';
import { ProductVariantEntity } from './product-variant.entity';
import { TaggedProductEntity } from './tagged-product.entity';
import { SavedCollectionItemEntity } from '../../saved-collections/entities/saved-collection-item.entity';
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity';
import { CartItemsEntity } from '../../carts/entities/cart-item.entity';

@Entity({
	name: 'products',
})
export class ProductEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Index()
	@Column({ type: 'boolean', default: false })
	isArchived: boolean = false;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	@Index()
	title: string | null;

	@Column({
		type: 'text',
		nullable: true,
	})
	description: string | null;

	@Index()
	@Column({
		type: 'float',
		nullable: true,
	})
	basePrice: number | null;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	@Index({ unique: true, where: 'sku IS NOT NULL AND "isArchived" != true' })
	sku: string | null;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	currency: string | null;

	@Column({
		type: 'int',
		nullable: true,
		default: 0,
	})
	stock: number;

	@Column({
		type: 'timestamptz',
		nullable: true,
	})
	lastStockUpdate: Date | null;

	@Column({ type: 'boolean', default: false, nullable: true })
	isOutOfStock: boolean = false;

	@Index()
	@Column({ type: Boolean, default: false, nullable: true })
	isFeatured: boolean = false;

	@Column({ nullable: false, default: 1 })
	deliveryEstimationInDays: number;

	@OneToMany(() => MediaEntity, (media) => media.product)
	media: MediaEntity[] | null;

	@OneToMany(() => ProductVariantEntity, (variant) => variant.mainProduct, {
		cascade: true,
	})
	variants: ProductVariantEntity[] | null;

	@OneToMany(() => ProductOptionEntity, (option) => option.product)
	options: ProductOptionEntity[];

	@OneToMany(() => ProductReviewEntity, (media) => media.product)
	ratings: ProductReviewEntity[] | null;

	@OneToMany(() => TaggedProductEntity, (taggedProduct) => taggedProduct.product)
	taggedIn: TaggedProductEntity[] | null;

	@OneToMany(() => AffiliationLinkEntity, (affiliationLink) => affiliationLink.product)
	affiliationLinks: AffiliationLinkEntity[] | null;

	@OneToMany(() => NotificationEntity, (notification) => notification.product)
	notifications: NotificationEntity[] | null;

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
	orderItems: OrderItemEntity[];

	@OneToMany(() => MessageEntity, (message) => message.product)
	messages: MessageEntity[];

	@ManyToOne(() => BrandProfileEntity, (brandProfile) => brandProfile.products, {
		nullable: true,
	})
	@JoinColumn({ name: 'brandId' })
	brand: BrandProfileEntity | null;

	@ManyToOne(() => CategoryEntity, (category) => category.products, {
		nullable: true,
	})
	@JoinColumn({ name: 'categoryId' })
	category: CategoryEntity | null;

	@ManyToOne(() => CategoryEntity, (category) => category.products, {
		nullable: true,
	})
	@JoinColumn({ name: 'subCategoryId' })
	subCategory: CategoryEntity | null;

	@ManyToMany(() => CollectionEntity, (collection) => collection.products, {
		onDelete: 'CASCADE',
	})
	collections: CollectionEntity[] | null;

	@OneToMany(() => CartItemsEntity, (cartItems) => cartItems.product)
	carts: CartItemsEntity[];

	@ManyToMany(() => PromotionEntity, (promotion) => promotion.products, {
		cascade: true,
	})
	promotions: PromotionEntity[] | null;

	@ManyToMany(() => PromoCodeEntity, (promoCode) => promoCode.products)
	promoCodes: PromoCodeEntity[] | null;

	@OneToMany(
		() => SavedCollectionItemEntity,
		(savedCollectionItem) => savedCollectionItem.product,
	)
	savedInCollections: SavedCollectionItemEntity[];

	@Index()
	@Column({ nullable: true })
	brandId: number | null;

	@Index()
	@Column({ nullable: true })
	categoryId: number | null;

	@Index()
	@Column({ nullable: true })
	subCategoryId: number | null;

	@VirtualColumn({ query: () => 'SELECT 0.0', type: 'float' })
	averageRating: number;

	// Manually set from products service
	isSaved: boolean;
}
