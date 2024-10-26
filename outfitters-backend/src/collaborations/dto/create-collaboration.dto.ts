import { IsNumber } from 'class-validator';

export class CreateCollaborationDto {
	@IsNumber()
	shopperId: number;
}
