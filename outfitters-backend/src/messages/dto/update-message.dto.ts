import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
	@IsNumber()
	messageId: number;

	@IsOptional()
	@IsString()
	reaction: string;
}
