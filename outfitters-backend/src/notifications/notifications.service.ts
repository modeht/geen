import { Injectable } from '@nestjs/common';
import { AuthContext } from 'src/auth/auth.context';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
	constructor(
		private readonly dataSource: DataSource,
		private readonly notificationsGateway: NotificationsGateway,
		private readonly authContext: AuthContext,
	) {}

	async findAll(paginated?: Paginated) {
		const userId = this.authContext.getUser()!.sub;
		const [notifications, totalCount] = await this.dataSource.manager.findAndCount(
			NotificationEntity,
			{
				take: +paginated.limit,
				skip: +paginated.page * +paginated.limit,
				where: { userId },
				order: { createdAt: 'DESC' },
				relations: [
					'comment.commentor',
					'product.media',
					'promotion',
					'collaboration.products.media',
				],
			},
		);
		return { notifications, totalCount };
	}

	async findOne(id: number) {
		return this.dataSource.manager.findOne(NotificationEntity, {
			where: { id },
			relations: [
				'comment.commentor',
				'product.media',
				'promotion',
				'collaboration.products.media',
			],
		});
	}

	async create(createNotificationDto: CreateNotificationDto, tr?: QueryRunner) {
		const userId = createNotificationDto.userId;

		const notification = new NotificationEntity();
		notification.type = createNotificationDto.type;
		notification.userId = createNotificationDto.userId;
		notification.customContent = createNotificationDto.customContent;
		notification.collaborationId = createNotificationDto.collaborationId;
		notification.commentId = createNotificationDto.commentId;
		notification.promotionId = createNotificationDto.promotionId;
		notification.productId = createNotificationDto.productId;

		if (tr) await tr.manager.save(notification);
		else await this.dataSource.manager.save(notification);

		this.notificationsGateway.sendNotification(userId, notification);

		return notification;
	}
}
