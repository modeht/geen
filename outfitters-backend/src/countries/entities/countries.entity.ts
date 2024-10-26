import { ApiHideProperty } from '@nestjs/swagger';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { MediaEntity } from '../../media/entities/media.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';

@Entity({ name: 'countries' })
export class CountryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', unique: true })
	name: string;

	@Column({ type: 'varchar', unique: true })
	code: string;

	@Column({ type: 'varchar', unique: true })
	dialCode: string;

	@Column({ type: 'boolean', default: true })
	isSupported: boolean;

	@OneToOne(() => MediaEntity, (media) => media.country, { eager: true })
	@JoinColumn({ name: 'iconId' })
	icon: MediaEntity;

	@ApiHideProperty()
	@ManyToMany(() => BrandProfileEntity, (brand) => brand.countries)
	brands: BrandProfileEntity[];

	@Column({ nullable: true })
	iconId: number;
}
