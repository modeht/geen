import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';

@Entity('sellers')
export class SellersEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@OneToOne(() => UsersEntity, (users) => users.id) user_id: UsersEntity;
@Column({ type: 'character varying', nullable: false, length: 100 }) store_name: string;
@CreateDateColumn({ type: 'timestamp with time zone', default: 'NOW()' }) created_at: Date;
}
