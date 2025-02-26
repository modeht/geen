import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';
import { Cart_itemsEntity } from '../../cart_items-feature/entities/cart_items.entity';

@Entity('products')
export class ProductsEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@Column({ type: 'int', nullable: true }) seller_id: number;
@ManyToOne(() => UsersEntity, (e) => e.seller_products) product_seller: UsersEntity;
@Column({ type: 'character varying', nullable: false, length: 255 }) name: string;
@Column({ type: 'text', nullable: true }) description: string;
@Column({ type: 'numeric', nullable: false, precision: 10, scale: 2 }) price: number;
@Column({ type: 'integer', nullable: false, default: '0' }) stock: number;
@CreateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) created_at: Date;
@UpdateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) updated_at: Date;
@OneToMany(() => Order_itemsEntity, (e) => e.order_item_product) product_order_items: Order_itemsEntity[]
@OneToMany(() => ReviewsEntity, (e) => e.review_product) product_reviews: ReviewsEntity[]
@OneToMany(() => Cart_itemsEntity, (e) => e.cart_item_product) product_cart_items: Cart_itemsEntity[]
}
