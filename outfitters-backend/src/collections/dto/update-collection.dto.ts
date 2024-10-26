import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCollectionDto {
	@IsString()
	@MinLength(1)
	@IsOptional()
	name?: string | null;

	@IsNumber()
	@IsOptional()
	coverId?: number | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	products: number[] | null;

	@IsBoolean()
	@IsOptional()
	isPublic?: boolean;
}
