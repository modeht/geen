import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProductReviewDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(5)
	stars?: number | null;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	comment?: string | null;

	@IsOptional()
	@IsNumber({}, { each: true })
	mediaIds?: number[] | null;
}
