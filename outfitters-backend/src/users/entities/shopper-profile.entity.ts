import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
	VirtualColumn,
} from 'typeorm';
import { AffiliationLinkEntity } from '../../affiliation-links/entities/affiliation-link.entity';
import { CartEntity } from '../../carts/entities/cart.entity';
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { PreferenceEntity } from '../../preferences/entities/preference.entity';
import { ProductReviewEntity } from '../../products/entities/product-review.entity';
import { ShippingAddressEntity } from './shipping-address.entity';
import { UserEntity } from './user.entity';
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity';

export enum GenderEnum {
	Male = 'male',
	Female = 'female',
}
@Entity({
	name: 'shopper_profiles',
})
export class ShopperProfileEntity {
	@PrimaryColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ type: 'varchar', nullable: true })
	@Index({ unique: true, where: 'username IS NOT NULL' })
	username: string | null;

	@Column({ type: 'varchar', nullable: true })
	@Index()
	fullName: string | null;

	@Column({ type: 'date', nullable: true })
	dateOfBirth: Date;

	@Column({ type: 'text', nullable: true })
	bio: string;

	@Column({ type: 'enum', nullable: true, enum: GenderEnum })
	gender: GenderEnum | null;

	@Column({ type: 'int', nullable: true, default: 0 })
	onboardingStep: number | null;

	@Column({ type: 'varchar', nullable: true })
	facebookProfileLink: string | null;

	@Column({ type: 'varchar', nullable: true })
	instagramProfileLink: string;

	@Column({ type: 'varchar', nullable: true })
	tiktokProfileLink: string;

	@Column({ type: 'boolean', nullable: true, default: false })
	isOutfitter: boolean;

	@OneToOne(() => UserEntity, (user) => user.shopperProfile)
	@JoinColumn({ name: 'id', referencedColumnName: 'id' })
	user: UserEntity;

	@OneToMany(() => ProductReviewEntity, (review) => review.shopperProfile, {
		nullable: true,
		cascade: true,
	})
	reviews: ProductReviewEntity[] | null;

	@OneToMany(() => ShippingAddressEntity, (address) => address.shopperProfile, {
		cascade: true,
		nullable: true,
	})
	addresses: ShippingAddressEntity[] | null;

	@OneToOne(() => MediaEntity, (media) => media.user, {
		nullable: true,
		cascade: true,
		eager: true,
	})
	@JoinColumn({
		name: 'profilePictureId',
	})
	profilePicture: MediaEntity | null;

	@OneToMany(() => CartEntity, (cart) => cart.shopperProfile, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	carts: CartEntity[] | null;

	@OneToMany(() => OrderEntity, (order) => order.shopperProfile, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	orders: OrderEntity[] | null;

	@ManyToMany(() => PreferenceEntity, (preference) => preference.shopperProfile, {
		nullable: true,
		cascade: true,
	})
	preferences: PreferenceEntity[] | null;

	// Outfitter relations
	@OneToMany(() => CollaborationEntity, (collaboration) => collaboration.shopperProfile, {
		nullable: true,
	})
	collaborations: CollaborationEntity[] | null;

	@OneToMany(
		() => AffiliationLinkEntity,
		(affiliationLink) => affiliationLink.shopperProfile,
	)
	affiliationLinks: AffiliationLinkEntity[] | null;

	@OneToMany(() => PromoCodeEntity, (promoCode) => promoCode.shopperProfile)
	promoCodes: PromoCodeEntity[] | null;

	@VirtualColumn({ query: () => `FALSE` })
	isFollowing?: boolean = null;

	@VirtualColumn({ query: () => `False` })
	hasStory?: boolean = null;

	@VirtualColumn({ query: () => `0` })
	followersCount?: number = null;

	@VirtualColumn({ query: () => `0` })
	followingCount?: number = null;

	@VirtualColumn({ query: () => `0` })
	postsCount?: number = null;

	@VirtualColumn({ query: () => `0` })
	brandsCount?: number = null;

	@VirtualColumn({ query: () => `0` })
	engagementCount?: number = null;
}
