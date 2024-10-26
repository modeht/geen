import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UseGuards,
} from '@nestjs/common';
import { AuthContext } from 'src/auth/auth.context';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { NotificationType } from 'src/notifications/entities/notification.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { DataSource, FindManyOptions } from 'typeorm';
import { OutfittersService } from '../users/services/outfitters.service';
import { CreateCollaborationDto } from './dto/create-collaboration.dto';
import { UpdateCollaborationStatusDto } from './dto/update-collaboration-status.dto';
import {
	CollaborationEntity,
	CollaborationStatusEnum,
} from './entities/collaboration.entity';

@Injectable()
@UseGuards(AuthGuard, RoleGuard)
export class CollaborationsService {
	constructor(
		private datasource: DataSource,
		private authContext: AuthContext,
		private outfittersService: OutfittersService,
		private messagesService: MessagesService,
		private notificationsService: NotificationsService,
	) {}

	// TODO: Add check that products belong to the brand (is it necessary?)
	// TODO: send notification to outfitter
	async create(createCollaborationDto: CreateCollaborationDto) {
		const { shopperId } = createCollaborationDto;
		const brandId = this.authContext.getUser().sub;

		const outfitter = await this.outfittersService.findOne(shopperId);

		if (!outfitter) {
			throw new BadRequestException('Invalid outfitter');
		}

		const collaboration = new CollaborationEntity();

		collaboration.brandId = brandId;
		collaboration.shopperId = shopperId;

		const tr = this.datasource.createQueryRunner();
		await tr.connect();
		await tr.startTransaction();

		try {
			const newCollab = await tr.manager.save(CollaborationEntity, collaboration);

			await this.messagesService.create(
				brandId,
				{
					collaboration: newCollab,
					recipientId: shopperId,
				} as CreateMessageDto,
				tr,
			);

			await this.notificationsService.create(
				{
					type: NotificationType.Collaboration,
					userId: shopperId,
					collaborationId: newCollab.id,
				},
				tr,
			);

			await tr.commitTransaction();
			return newCollab;
		} catch (error) {
			await tr.rollbackTransaction();
			throw error;
		} finally {
			await tr.release();
		}
	}

	async findOne(id: number) {
		const userId = this.authContext.getUser().sub;
		const collaberation = await this.datasource.manager.findOne(CollaborationEntity, {
			where: [
				{ id, shopperId: userId },
				{ id, brandId: userId },
			],
			relations: {
				shopperProfile: true,
				brandProfile: true,
			},
		});

		if (!collaberation) {
			throw new ForbiddenException('You are not allowed to view this');
		}

		return collaberation;
	}

	async findAll(findManyOptions: FindManyOptions<CollaborationEntity>) {
		const [collaborations, totalCount] = await this.datasource.manager.findAndCount(
			CollaborationEntity,
			findManyOptions,
		);
		return { collaborations, totalCount };
	}

	// TODO: Notify brand of status change
	async updateStatus(
		id: number,
		updateCollaborationStatusDto: UpdateCollaborationStatusDto,
	) {
		const { status } = updateCollaborationStatusDto;
		const shopperId = this.authContext.getUser().sub;
		const collaboration = await this.findOne(id);

		if (!collaboration) {
			throw new NotFoundException('Collaboration not found');
		}

		if (collaboration.shopperId !== shopperId) {
			throw new ForbiddenException('Only the outfitter can update status');
		}

		if (collaboration.status !== 'pending') {
			throw new BadRequestException(
				`Collaboration status is not pending currently it is ${collaboration.status}`,
			);
		}

		collaboration.status = status;

		return this.datasource.manager.save(CollaborationEntity, collaboration);
	}

	async isProductAffiliated(shopperId: number, productId: number) {
		return this.datasource.manager.count(CollaborationEntity, {
			where: {
				shopperId: shopperId,
				status: CollaborationStatusEnum.Accepted,
				brandProfile: {
					products: { id: productId },
				},
			},
		});
	}
}
