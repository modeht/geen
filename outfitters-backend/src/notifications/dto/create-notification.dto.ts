import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '../entities/notification.entity';

export class CreateNotificationDto {
	@IsEnum(NotificationType)
	type: NotificationType;

	@IsNumber()
	userId: number;

	@IsString()
	@IsOptional()
	customContent?: string;

	@IsNumber()
	@IsOptional()
	collaborationId?: number;

	@IsNumber()
	@IsOptional()
	commentId?: number;

	@IsNumber()
	@IsOptional()
	promotionId?: number;

	@IsNumber()
	@IsOptional()
	productId?: number;
}
