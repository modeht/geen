import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';
import { Cart_itemsEntity } from '../../cart_items-feature/entities/cart_items.entity';

@Entity('orders')
export class OrdersEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@Column({ type: 'int', nullable: true }) user_id: number;
@ManyToOne(() => UsersEntity, (e) => e.user_orders) order_user: UsersEntity;
@Column({ type: 'numeric', nullable: false, precision: 10, scale: 2 }) total_amount: number;
@Column({ type: 'character varying', nullable: false, length: 50, default: 'pending' }) order_status: string;
@CreateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) created_at: Date;
@UpdateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) updated_at: Date;
@OneToMany(() => Order_itemsEntity, (e) => e.order_item_order) order_order_items: Order_itemsEntity[]
}
