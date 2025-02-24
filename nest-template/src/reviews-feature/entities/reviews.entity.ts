import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { SellersEntity } from '../../sellers-feature/entities/sellers.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { Order_itemsEntity } from '../../order_items-feature/entities/order_items.entity';

@Entity('reviews')
export class ReviewsEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@OneToOne(() => UsersEntity, (users) => users.id) user_id: UsersEntity;
@OneToOne(() => ProductsEntity, (products) => products.id) product_id: ProductsEntity;
@Column({ type: 'integer', nullable: false }) rating: number;
@Column({ type: 'text', nullable: true }) review_text: string;
@CreateDateColumn({ type: 'timestamp with time zone', default: 'NOW()' }) created_at: Date;
}
