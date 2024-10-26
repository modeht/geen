import { CollaborationEntity } from 'src/collaborations/entities/collaboration.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { PromotionEntity } from 'src/promotions/entities/promotion.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

export enum NotificationType {
	Comment = 'comment',
	Collaboration = 'collaboration',
	Promotion = 'promotion',
	Stock = 'stock',
	Custom = 'custom',
}

@Entity({ name: 'notifications' })
export class NotificationEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'enum',
		enum: NotificationType,
	})
	type: NotificationType;

	@Column({ type: 'text', nullable: true })
	customContent: string;

	@Column({ type: 'boolean', default: false })
	isRead: boolean;

	@ManyToOne(() => UserEntity, (user) => user.notifications, {
		onDelete: 'CASCADE',
	})
	user: UserEntity;

	@ManyToOne(() => CollaborationEntity, (collaboration) => collaboration.notifications, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'collaborationId' })
	collaboration: CollaborationEntity;

	@ManyToOne(() => CommentEntity, (comment) => comment.notifications, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'commentId' })
	comment: CommentEntity;

	@ManyToOne(() => PromotionEntity, (promotion) => promotion.notifications, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'promotionId' })
	promotion: PromotionEntity;

	@ManyToOne(() => ProductEntity, (product) => product.notifications, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'productId' })
	product: ProductEntity;

	@Column()
	@Index()
	userId: number;

	@Column({ nullable: true })
	collaborationId: number;

	@Column({ nullable: true })
	commentId: number;

	@Column({ nullable: true })
	promotionId: number;

	@Column({ nullable: true })
	productId: number;

	@CreateDateColumn()
	createdAt: Date;

	@CreateDateColumn()
	updatedAt: Date;
}
