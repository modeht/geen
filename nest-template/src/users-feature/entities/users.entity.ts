import {
	Column,
	Entity,
	UpdateDateColumn,
	PrimaryColumn,
	OneToMany,
	ManyToOne,
	ManyToMany,
	OneToOne,
	CreateDateColumn,
} from 'typeorm';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';
import { Cart_itemsEntity } from '../../cart_items-feature/entities/cart_items.entity';

@Entity('users')
export class UsersEntity {
	@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
	@Column({ type: 'character varying', nullable: false, unique: true, length: 255 }) username: string;
	@Column({ type: 'character varying', nullable: false, unique: true, length: 255 }) email: string;
	@Column({ type: 'character varying', nullable: false, length: 255 }) password: string;
	@Column({ type: 'character varying', nullable: false, default: 'customer', length: 50 }) role: string;
	@CreateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) created_at: Date;
	@UpdateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) updated_at: Date;
	@OneToMany(() => ProductsEntity, (e) => e.product_seller) seller_products: ProductsEntity[];
	@OneToMany(() => OrdersEntity, (e) => e.order_user) user_orders: OrdersEntity[];
	@OneToMany(() => ReviewsEntity, (e) => e.review_user) user_reviews: ReviewsEntity[];
	@OneToMany(() => Cart_itemsEntity, (e) => e.cart_item_user) user_cart_items: Cart_itemsEntity[];
}
