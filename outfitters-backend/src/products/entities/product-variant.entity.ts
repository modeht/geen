import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { OrderItemEntity } from '../../orders/entities/order-item.entity';
import { ProductOptionValueEntity } from './product-option-value.entity';
import { ProductEntity } from './product.entity';
import { CartItemsEntity } from '../../carts/entities/cart-item.entity';

@Entity({ name: 'product_variants' })
export class ProductVariantEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'boolean', default: false })
	isArchived: boolean = false;

	@Column({
		type: 'int',
		nullable: false,
		default: 0,
	})
	stock: number;

	@Column({
		type: 'float',
		nullable: true,
	})
	price: number | null;

	@Column({
		type: 'timestamptz',
		nullable: true,
	})
	lastStockUpdate: Date | null;

	@Column({
		type: 'varchar',
		nullable: true,
	})
	@Index({ unique: true, where: 'sku IS NOT NULL AND "isArchived" != true' })
	sku: string | null;

	@OneToMany(() => MediaEntity, (media) => media.productVariant)
	media: MediaEntity[] | null;

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.variant)
	orderItems: OrderItemEntity[];

	@OneToMany(() => CartItemsEntity, (cartItems) => cartItems.variant)
	carts: CartItemsEntity[];

	@ManyToOne(() => ProductEntity, (product) => product.variants, {
		onDelete: 'CASCADE',
		orphanedRowAction: 'delete',
	})
	@JoinColumn({ name: 'mainProductId' })
	mainProduct: ProductEntity;

	@ManyToMany(() => ProductOptionValueEntity, (optionValue) => optionValue.variants, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	@JoinTable({
		name: 'product_variant_attributes',
		joinColumn: { name: 'variantId', referencedColumnName: 'id' },
	})
	optionValues: ProductOptionValueEntity[];

	@Column()
	mainProductId: number | null;
}
