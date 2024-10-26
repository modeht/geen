import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindMessagesDto {
	@IsNumberString()
	conversationId: number;

	@IsString()
	@IsOptional()
	keyword: string;
}
