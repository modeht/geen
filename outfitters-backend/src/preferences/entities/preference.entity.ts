import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';

@Entity({
	name: 'preferences',
})
export class PreferenceEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => MediaEntity, (media) => media.preference, {
		cascade: true,
		nullable: true,
	})
	@JoinColumn({
		name: 'mediaId',
	})
	media: MediaEntity | null;

	@Column({ type: 'varchar', nullable: true })
	name: string | null;

	@ManyToMany(() => BrandProfileEntity, (brand) => brand.preferences, {
		nullable: true,
	})
	@JoinTable({
		name: 'brands_preferences',
		joinColumn: {
			name: 'preferenceId',
		},
		inverseJoinColumn: {
			name: 'brandId',
		},
	})
	brandProfile: BrandProfileEntity[] | null;

	@ManyToMany(
		() => ShopperProfileEntity,
		(shopperProfile) => shopperProfile.preferences,
		{ nullable: true },
	)
	@JoinTable({
		name: 'shopper_preferences',
		joinColumn: {
			name: 'preferenceId',
		},
		inverseJoinColumn: {
			name: 'shopperId',
		},
	})
	shopperProfile: ShopperProfileEntity[] | null;

	@Column({ nullable: true })
	mediaId: number | null;
}
