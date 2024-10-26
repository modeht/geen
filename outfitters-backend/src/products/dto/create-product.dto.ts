import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Min,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class CreateProductDto {
	@IsString()
	@MinLength(1)
	title: string;

	@IsString()
	@MinLength(1)
	description: string;

	@IsNumber()
	@Min(0)
	basePrice: number;

	@IsString()
	currency: string;

	@IsBoolean()
	isFeatured?: boolean;

	@IsNumber()
	@IsPositive()
	@Min(1)
	deliveryEstimationInDays: number;

	@IsOptional()
	@IsString()
	sku: string | null;

	@IsOptional()
	@IsNumber()
	stock: number | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	mediaIds: number[] | null;

	@IsNumber({}, { each: true })
	@IsOptional()
	collectionsIds?: number[] | null;

	@IsNumber()
	@IsOptional()
	categoryId: number | null;

	@IsNumber()
	@IsOptional()
	subCategoryId: number | null;

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => CreateProductVariantDto)
	@IsOptional()
	variants: CreateProductVariantDto[];
}
