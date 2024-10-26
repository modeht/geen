import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsNumber()
	superCategoryId: number;

	@IsOptional()
	@IsNumber()
	mediaId: number;
}
