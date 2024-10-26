import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSavedCollectionDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsNumber({}, { each: true })
	postIds: number[];

	@IsOptional()
	@IsNumber({}, { each: true })
	productIds: number[];
}
