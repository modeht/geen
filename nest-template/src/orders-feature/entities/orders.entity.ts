import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { SellersEntity } from '../../sellers-feature/entities/sellers.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';

@Entity('orders')
export class OrdersEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@OneToOne(() => UsersEntity, (users) => users.id) user_id: UsersEntity;
@Column({ type: 'numeric', nullable: false, precision: 10, scale: 2 }) total_amount: number;
@Column({ type: 'timestamp with time zone', default: 'NOW()' }) placed_at: Date;
}
