import { ProductEntity } from 'src/products/entities/product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';
import { SeasonalPromotionEntity } from '../../promotions/entities/seasonal-promotion.entity';

@Entity({ name: 'categories' })
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({
		type: 'time',
		nullable: false,
	})
	@Index()
	name: string;

	@Column({ type: 'boolean', default: false })
	isArchived: boolean;

	@OneToOne(() => MediaEntity, (media) => media.category, {
		eager: true,
		nullable: true,
	})
	@JoinColumn({ name: 'mediaId' })
	media: MediaEntity | null;

	@OneToMany(() => CategoryEntity, (category) => category.superCategory, {
		nullable: true,
		cascade: true,
	})
	subCategories: CategoryEntity[];

	@ManyToOne(() => CategoryEntity, (category) => category.subCategories, {
		nullable: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'superCategoryId' })
	superCategory: CategoryEntity;

	@Column({ nullable: true })
	superCategoryId: number | null;

	@OneToMany(() => ProductEntity, (product) => product.category, {
		nullable: true,
	})
	products: ProductEntity[] | null;

	@ManyToMany(() => BrandProfileEntity, (brandProfile) => brandProfile.categories)
	categorybrandProfiles: BrandProfileEntity[];

	@ManyToMany(() => BrandProfileEntity, (brandProfile) => brandProfile.subCategories)
	subCategoriesBrandProfiles: BrandProfileEntity[];

	@ManyToMany(
		() => SeasonalPromotionEntity,
		(seasonalPromotion) => seasonalPromotion.subCategories,
	)
	seasonalPromotions: SeasonalPromotionEntity[];

	@Column({ type: 'jsonb', nullable: true })
	test: {
		a: true;
	} | null;
}
