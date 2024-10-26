import { NotificationEntity } from 'src/notifications/entities/notification.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { MessageEntity } from '../../messages/entities/message.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity';
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity';

export enum CollaborationStatusEnum {
	Pending = 'pending',
	Accepted = 'accepted',
	Rejected = 'rejected',
}

@Entity({
	name: 'collaborations',
})
export class CollaborationEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => MessageEntity, (message) => message.collaboration)
	message: MessageEntity;

	@ManyToOne(() => BrandProfileEntity, (brandProfile) => brandProfile.collaborations)
	@JoinColumn({ name: 'brandId' })
	brandProfile: BrandProfileEntity;

	@ManyToOne(
		() => ShopperProfileEntity,
		(shopperProfile) => shopperProfile.collaborations,
	)
	@JoinColumn({ name: 'shopperId' })
	shopperProfile: ShopperProfileEntity;

	@Column({
		type: 'enum',
		enum: CollaborationStatusEnum,
		default: CollaborationStatusEnum.Pending,
	})
	status: CollaborationStatusEnum = CollaborationStatusEnum.Pending;

	@OneToMany(() => NotificationEntity, (notification) => notification.collaboration, {
		nullable: true,
	})
	notifications: NotificationEntity[] | null;

	@Column({ nullable: true })
	brandId: number | null;

	@Column({ nullable: true })
	shopperId: number | null;
}
