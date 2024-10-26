import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateConversationDto {
	@ApiProperty()
	@IsBoolean()
	isArchived: boolean;
}
