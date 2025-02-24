import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { SellersEntity } from '../../sellers-feature/entities/sellers.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';

@Entity('products')
export class ProductsEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@OneToOne(() => SellersEntity, (sellers) => sellers.id) seller_id: SellersEntity;
@Column({ type: 'character varying', nullable: false, length: 100 }) name: string;
@Column({ type: 'text', nullable: true }) description: string;
@Column({ type: 'numeric', nullable: false, precision: 10, scale: 2 }) price: number;
@Column({ type: 'integer', nullable: false }) inventory_count: number;
@CreateDateColumn({ type: 'timestamp with time zone', default: 'NOW()' }) created_at: Date;
}
