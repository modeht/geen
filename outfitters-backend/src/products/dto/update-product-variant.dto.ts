import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductVariantDto {
	@IsNumber()
	@Min(0)
	@IsOptional()
	price?: number;

	@IsString()
	@IsOptional()
	sku?: string;

	@IsNumber()
	@IsOptional()
	stock?: number | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	mediaIds?: number[] | null;
}
