import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CollectionEntity } from '../../collections/entities/collection.entity';
import { CountryEntity } from '../../countries/entities/countries.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { PreferenceEntity } from '../../preferences/entities/preference.entity';
import { ProductReviewEntity } from '../../products/entities/product-review.entity';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { StoryEntity } from '../../stories/entities/story.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';

@Entity({
	name: 'media',
})
export class MediaEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => PreferenceEntity, (preference) => preference.media, {
		onDelete: 'SET NULL',
	})
	preference: PreferenceEntity;

	@OneToOne(() => CollectionEntity, (collection) => collection.cover, {
		onDelete: 'SET NULL',
	})
	collectionCover: CollectionEntity;

	@OneToOne(
		() => ShopperProfileEntity,
		(shopperProfile) => shopperProfile.profilePicture,
		{
			onDelete: 'SET NULL',
		},
	)
	user: ShopperProfileEntity;

	@OneToOne(() => StoryEntity, (story) => story.media, {
		onDelete: 'SET NULL',
	})
	story: StoryEntity;

	@OneToOne(() => BrandProfileEntity, (brand) => brand.cover, {
		onDelete: 'SET NULL',
	})
	brandStoreCover: BrandProfileEntity;

	@OneToOne(() => BrandProfileEntity, (brand) => brand.logo, {
		onDelete: 'SET NULL',
	})
	brandStoreLogo: BrandProfileEntity;

	@OneToOne(() => CategoryEntity, (category) => category.media, {
		onDelete: 'SET NULL',
	})
	category: CategoryEntity;

	@OneToOne(() => CountryEntity, (country) => country.icon, {
		onDelete: 'SET NULL',
	})
	country: CountryEntity;

	@OneToOne(() => PostEntity, (post) => post.thumbnail, {
		onDelete: 'SET NULL',
	})
	postThumbnail: PostEntity;

	@ManyToOne(() => ProductEntity, (product) => product.media, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	@JoinColumn({
		name: 'productId',
	})
	product: ProductEntity | null;
	@ManyToOne(() => ProductVariantEntity, (productVariant) => productVariant.media, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	@JoinColumn({
		name: 'productVariantId',
	})
	productVariant: ProductVariantEntity | null;

	@ManyToOne(() => MessageEntity, (message) => message.media, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	@JoinColumn({
		name: 'messageId',
	})
	message: MessageEntity | null;

	@ManyToOne(() => PostEntity, (post) => post.media, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	@JoinColumn({
		name: 'postId',
	})
	post: PostEntity | null;

	@ManyToOne(() => ProductReviewEntity, (review) => review.media, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	@JoinColumn({
		name: 'reviewId',
	})
	review: ProductReviewEntity;

	@Column({ type: 'varchar', nullable: true })
	mimetype: string | null;

	@Column({ type: 'text', nullable: true })
	url: string | null;

	@Column({ type: 'float', nullable: true })
	size: number | null;

	@Column({ type: 'float', nullable: true })
	width: number | null;

	@Column({ type: 'float', nullable: true })
	height: number | null;
}
