import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';

@Entity('cart_items')
export class Cart_itemsEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@Column({ type: 'int', nullable: true }) user_id: number;
@ManyToOne(() => UsersEntity, (e) => e.user_cart_items) cart_item_user: UsersEntity;
@Column({ type: 'int', nullable: true }) product_id: number;
@ManyToOne(() => ProductsEntity, (e) => e.product_cart_items) cart_item_product: ProductsEntity;
@Column({ type: 'integer', nullable: false, default: '1' }) quantity: number;
@CreateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) added_at: Date;
}
