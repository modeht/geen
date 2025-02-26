import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { Cart_itemsEntity } from '../../cart_items-feature/entities/cart_items.entity';

@Entity('reviews')
export class ReviewsEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@Column({ type: 'int', nullable: true }) product_id: number;
@ManyToOne(() => ProductsEntity, (e) => e.product_reviews) review_product: ProductsEntity;
@Column({ type: 'int', nullable: true }) user_id: number;
@ManyToOne(() => UsersEntity, (e) => e.user_reviews) review_user: UsersEntity;
@Column({ type: 'smallint', nullable: false }) rating: number;
@Column({ type: 'text', nullable: true }) comment: string;
@CreateDateColumn({ type: 'timestamp with time zone', nullable: false, default: 'NOW()' }) created_at: Date;
}
