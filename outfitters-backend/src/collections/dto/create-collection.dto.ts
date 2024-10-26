import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCollectionDto {
	@IsString()
	@MinLength(1)
	name: string;

	@IsNumber()
	coverId: number;

	@IsBoolean()
	isPublic: boolean;
}
