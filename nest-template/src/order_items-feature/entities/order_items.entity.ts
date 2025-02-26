import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';
import { Cart_itemsEntity } from '../../cart_items-feature/entities/cart_items.entity';

@Entity('order_items')
export class Order_itemsEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@Column({ type: 'int', nullable: true }) order_id: number;
@ManyToOne(() => OrdersEntity, (e) => e.order_order_items) order_item_order: OrdersEntity;
@Column({ type: 'int', nullable: true }) product_id: number;
@ManyToOne(() => ProductsEntity, (e) => e.product_order_items) order_item_product: ProductsEntity;
@Column({ type: 'integer', nullable: false, default: '1' }) quantity: number;
@Column({ type: 'numeric', nullable: false, precision: 10, scale: 2 }) unit_price: number;
}
