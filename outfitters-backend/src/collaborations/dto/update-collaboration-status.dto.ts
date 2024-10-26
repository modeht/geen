import { IsEnum } from 'class-validator';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';

export class UpdateCollaborationStatusDto {
	@IsEnum(CollaborationStatusEnum)
	status: CollaborationStatusEnum;
}
