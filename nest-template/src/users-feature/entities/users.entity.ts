import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { SellersEntity } from '../../sellers-feature/entities/sellers.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';

@Entity('users')
export class UsersEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@Column({ type: 'character varying', nullable: false, unique: true, length: 50 }) username: string;
@Column({ type: 'character varying', nullable: false, unique: true, length: 100 }) email: string;
@Column({ type: 'character varying', nullable: false, length: 255 }) password_hash: string;
@CreateDateColumn({ type: 'timestamp with time zone', default: 'NOW()' }) created_at: Date;
}
