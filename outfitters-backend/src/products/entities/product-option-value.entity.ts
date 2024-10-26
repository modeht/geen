import {
	Column,
	Entity,
	Generated,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryColumn,
	Unique,
} from 'typeorm';
import { ProductOptionEntity } from './product-option.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Entity({ name: 'product_option_values' })
@Unique(['optionName', 'productId', 'value'])
export class ProductOptionValueEntity {
	@Generated('rowid')
	@Column({ type: 'int', unique: true, nullable: false })
	id: number;

	@PrimaryColumn({ type: 'varchar', unique: true, nullable: false })
	value: string;

	//frontend need this for whatever reason. i am enabling it for now
	@PrimaryColumn({ type: 'varchar', unique: true, nullable: false })
	optionName: string;

	@PrimaryColumn({ type: 'int', unique: true, nullable: false, select: false })
	productId: number;

	@ManyToOne(() => ProductOptionEntity, (option) => option.values, {
		onDelete: 'CASCADE',
		cascade: true,
	})
	@JoinColumn([
		{ name: 'optionName', referencedColumnName: 'name' },
		{
			name: 'productId',
			referencedColumnName: 'productId',
		},
	])
	option: ProductOptionEntity;

	@ManyToMany(() => ProductVariantEntity, (variant) => variant.optionValues, {
		onDelete: 'CASCADE',
	})
	variants: ProductVariantEntity[];
}
