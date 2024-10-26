import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { PromotionEntity } from './promotion.entity';
import { PromotionStatusEnum } from './enums';

@Entity({ name: 'seasonal_promotions' })
export class SeasonalPromotionEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	title: string;

	@Column({ type: 'date' })
	start: Date;

	@Column({ type: 'date' })
	end: Date;

	@Column({
		type: 'enum',
		enum: PromotionStatusEnum,
		nullable: false,
		default: PromotionStatusEnum.Active,
	})
	status: PromotionStatusEnum;

	@OneToMany(() => PromotionEntity, (promotion) => promotion.seasonalPromotion)
	promotions: PromotionEntity[];

	@ManyToMany(() => CategoryEntity, (category) => category.seasonalPromotions)
	@JoinTable({
		name: 'seasonal_promotions_sub_categories',
		joinColumn: { name: 'seasonalPromotionId' },
		inverseJoinColumn: { name: 'categoryId' },
	})
	subCategories: CategoryEntity[];
}
