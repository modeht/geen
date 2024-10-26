import { IsEnum, IsOptional } from 'class-validator';
import { CollaborationStatusEnum } from '../entities/collaboration.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindCollaborationDto {
	@ApiProperty({
		type: 'enum',
		enum: CollaborationStatusEnum,
		description: Object.values(CollaborationStatusEnum).join(', '),
	})
	@IsEnum(CollaborationStatusEnum)
	@IsOptional()
	status: CollaborationStatusEnum;
}
