import { ProductEntity } from 'src/products/entities/product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
	VirtualColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity';
import { CollectionEntity } from '../../collections/entities/collection.entity';
import { CountryEntity } from '../../countries/entities/countries.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { PreferenceEntity } from '../../preferences/entities/preference.entity';
import { UserEntity } from './user.entity';
import { PromotionEntity } from '../../promotions/entities/promotion.entity';
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity';
import { BrandOrderEntity } from '../../orders/entities/brand-orders.entity';

@Entity({
	name: 'brand_profiles',
})
export class BrandProfileEntity {
	@PrimaryColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'varchar', nullable: true })
	@Index({ unique: true, where: '"storeName" IS NOT NULL' })
	storeName: string | null;

	@Column({ type: 'varchar', nullable: true })
	@Index()
	brandName: string | null;

	@Column({ type: 'text', nullable: true })
	storeBio: string | null;

	@Column({ type: 'text', nullable: true })
	website: string | null;

	@Column({ type: 'boolean', default: false })
	isPublished: boolean;

	@Column({ type: 'float', nullable: true })
	shippingCost: number | null;

	@Column({ type: 'varchar', nullable: true, select: false })
	currency: string | null;

	@Column({ type: 'varchar', nullable: true, select: false })
	brandManagerFullName: string | null;

	@OneToOne(() => UserEntity, (user) => user.brandProfile)
	@JoinColumn({ name: 'id', referencedColumnName: 'id' })
	user: UserEntity;

	@OneToOne(() => MediaEntity, (media) => media.brandStoreLogo, {
		nullable: true,
		cascade: true,
		eager: true,
	})
	@JoinColumn({
		name: 'logoId',
	})
	logo: MediaEntity | null;

	@OneToOne(() => MediaEntity, (media) => media.brandStoreCover, {
		nullable: true,
		cascade: true,
		eager: true,
	})
	@JoinColumn({
		name: 'converId',
	})
	cover: MediaEntity | null;

	@OneToMany(() => CollectionEntity, (collection) => collection.brand, {
		cascade: true,
		nullable: true,
	})
	collections: CollectionEntity[] | null;

	@OneToMany(() => ProductEntity, (product) => product.brand, {
		cascade: true,
		nullable: true,
	})
	products: ProductEntity[] | null;

	@OneToMany(() => PromotionEntity, (promotion) => promotion.brand)
	promotions: PromotionEntity[] | null;

	@OneToMany(() => PromoCodeEntity, (promoCode) => promoCode.brand)
	promoCodes: PromoCodeEntity[] | null;

	@OneToMany(() => BrandOrderEntity, (brandOrder) => brandOrder.brand)
	brandOrders: BrandOrderEntity[] | null;

	@ManyToMany(() => PreferenceEntity, (preference) => preference.brandProfile, {
		nullable: true,
		cascade: true,
	})
	preferences: PreferenceEntity[] | null;

	@OneToMany(() => CollaborationEntity, (collaboration) => collaboration.brandProfile, {
		nullable: true,
		cascade: true,
	})
	collaborations: CollaborationEntity[] | null;

	@ManyToMany(() => CategoryEntity, (category) => category.categorybrandProfiles)
	@JoinTable({
		name: 'brand_categories',
		joinColumn: {
			name: 'brandId',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'categoryId',
			referencedColumnName: 'id',
		},
	})
	categories: CategoryEntity[] | null;

	@ManyToMany(() => CategoryEntity, (category) => category.subCategoriesBrandProfiles)
	@JoinTable({
		name: 'brand_sub_categories',
		joinColumn: {
			name: 'brandId',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'categoryId',
			referencedColumnName: 'id',
		},
	})
	subCategories: CategoryEntity[] | null;

	@ManyToMany(() => CountryEntity, (country) => country.brands)
	@JoinTable({
		name: 'brand_countries',
		joinColumn: {
			name: 'brandId',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'countryId',
			referencedColumnName: 'id',
		},
	})
	countries: CountryEntity[] | null;

	@Column({ nullable: true })
	logoId: number | null;

	@VirtualColumn({ query: () => `FALSE` })
	isFollowing?: boolean = null;

	@VirtualColumn({ query: () => `FALSE` })
	hasStory?: boolean = null;

	@VirtualColumn({ query: () => `0` })
	followersCount?: number = null;

	@VirtualColumn({ query: () => `0` })
	followingCount?: number = null;

	@VirtualColumn({ query: () => `0` })
	postsCount?: number = null;
}
