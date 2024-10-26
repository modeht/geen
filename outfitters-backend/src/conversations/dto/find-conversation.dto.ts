import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ConversationType {
	ALL = 'all',
	COLLABORATION = 'collaboration',
	ARCHIVED = 'archived',
}

export class FindConversationDto {
	@ApiProperty({
		description: 'The type of conversation to find',
		required: false,
		enum: ConversationType,
	})
	@IsEnum(ConversationType)
	type: ConversationType = ConversationType.ALL;

	@IsOptional()
	@IsString()
	keyword?: string;
}
