import { UserEntity } from 'src/users/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { AffiliationLinkEntity } from './affiliation-link.entity';

@Entity({ name: 'affiliation_link_tracking' })
export class AffiliationLinkTrackingEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(
		() => AffiliationLinkEntity,
		(affiliationLink) => affiliationLink.affiliationLinkTracking,
	)
	affiliationLink: AffiliationLinkEntity;

	@ManyToOne(() => UserEntity, (user) => user.affiliationLinkTracking)
	user: UserEntity;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: true,
	})
	referrer: string | null;

	@Column({ type: 'varchar', length: 60 })
	country: string;

	@Column({
		type: 'varchar',
		length: 15,
		nullable: true,
	})
	ipAddress: string | null;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: true,
	})
	userAgent: string | null;
}
