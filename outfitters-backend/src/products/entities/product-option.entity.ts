import {
	Column,
	Entity,
	Generated,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { ProductOptionValueEntity } from './product-option-value.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_options' })
export class ProductOptionEntity {
	@Generated('rowid')
	@Column({ type: 'int', unique: true, nullable: false })
	id: number;

	@PrimaryColumn({
		type: 'varchar',
		unique: true,
		nullable: false,
	})
	name: string;

	@PrimaryColumn({
		type: 'int',
		unique: true,
		nullable: false,
		select: false,
	})
	productId: number;

	@ManyToOne(() => ProductEntity, (product) => product.options, {
		onDelete: 'CASCADE',
		orphanedRowAction: 'delete',
	})
	@JoinColumn({ name: 'productId' })
	product: ProductEntity;

	@OneToMany(() => ProductOptionValueEntity, (value) => value.option, {
		onDelete: 'CASCADE',
	})
	values: ProductOptionValueEntity[];
}
