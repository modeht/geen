import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Min,
	MinLength,
} from 'class-validator';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class UpdateProductDto {
	@IsString()
	@MinLength(1)
	@IsOptional()
	title: string;

	@IsString()
	@MinLength(1)
	@IsOptional()
	description: string;

	@IsNumber()
	@Min(0)
	@IsOptional()
	basePrice: number;

	@IsString()
	@IsOptional()
	currency: string;

	@IsNumber()
	@IsOptional()
	categoryId: number | null;

	@IsNumber()
	@IsOptional()
	subCategoryId: number | null;

	@IsBoolean()
	@IsOptional()
	isFeatured?: boolean;

	@IsNumber()
	@IsPositive()
	@Min(1)
	@IsOptional()
	deliveryEstimationInDays: number;

	@IsOptional()
	@IsString()
	sku: string | null;

	@IsOptional()
	@IsNumber()
	stock: number | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	mediaIds?: number[] | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	collectionsIds?: number[] | null;

	@IsOptional()
	@IsArray()
	@Type(() => CreateProductVariantDto)
	variants: CreateProductVariantDto[];
}
