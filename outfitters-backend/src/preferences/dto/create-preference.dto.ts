import { IsNumber, IsString } from 'class-validator';

export class CreatePreferenceDto {
	@IsString()
	name: string;

	@IsNumber()
	mediaId: number;
}
