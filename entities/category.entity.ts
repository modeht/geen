// @ts-nocheck
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { CategoryFilterEntity } from '../../category-fitlers/entities/category-filters.entity';
import { TranslationEntity } from '../../translations/entities/translation.entity';
import { MediaEntity } from '../../media/entities/media.entity';
import { AdEntity } from '../../ads/entities/ad.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserInterestEntity } from '../../users/entities/user-interests.entity';
import { BannerEntity } from '../../banners/entities/banner.entity';

export enum testenum {}
@Entity({
	name: 'categories',
})
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: true })
	name: string | null;

	@Column({ type: 'enum', enum: testenum, nullable: true })
	testenum: testenum;

	@OneToMany(() => UserInterestEntity, (interest) => interest.category, {
		nullable: true,
		cascade: true,
	})
	interestedIn: UserInterestEntity[] | null;

	@OneToMany(() => BannerEntity, (banner) => banner.category, {
		cascade: true,
		nullable: true,
	})
	banners: BannerEntity | null;

	@ManyToOne(() => MediaEntity, (media) => media.categories, {
		cascade: true,
		nullable: true,
	})
	@JoinColumn({
		name: 'mediaId',
	})
	icon: MediaEntity | null;

	@OneToMany(() => TranslationEntity, (translations) => translations.category, {
		nullable: true,
		cascade: true,
	})
	translations: TranslationEntity[] | null;

	@OneToMany(() => CategoryFilterEntity, (categoryFilter) => categoryFilter.category, {
		nullable: true,
		cascade: true,
	})
	filters: CategoryFilterEntity[] | null;

	@ManyToMany(() => AdEntity, (ad) => ad.categories, {
		onDelete: 'SET NULL',
	})
	ads: AdEntity[];

	@ManyToOne(() => CategoryFilterEntity, (categoryFilter) => categoryFilter.categories, {
		nullable: true,
	})
	@JoinColumn({
		name: 'filterId',
	})
	filter: CategoryFilterEntity | null; //if null its a root node

	@Column({ type: 'boolean', default: true })
	visible: boolean;

	@Column({ type: 'boolean', default: false })
	isArchived: boolean;

	@Column({ type: 'int', nullable: true })
	index: number | null;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
