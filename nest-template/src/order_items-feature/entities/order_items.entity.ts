import { Column, Entity, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { UsersEntity } from '../../users-feature/entities/users.entity';
import { SellersEntity } from '../../sellers-feature/entities/sellers.entity';
import { ProductsEntity } from '../../products-feature/entities/products.entity';
import { OrdersEntity } from '../../orders-feature/entities/orders.entity';
import { ReviewsEntity } from '../../reviews-feature/entities/reviews.entity';

@Entity('order_items')
export class Order_itemsEntity {
@PrimaryColumn({ type: 'int', generated: 'increment' }) id: number;
@OneToOne(() => OrdersEntity, (orders) => orders.id) order_id: OrdersEntity;
@OneToOne(() => ProductsEntity, (products) => products.id) product_id: ProductsEntity;
@Column({ type: 'integer', nullable: false }) quantity: number;
@Column({ type: 'numeric', nullable: false, precision: 10, scale: 2 }) price_at_purchase: number;
}
