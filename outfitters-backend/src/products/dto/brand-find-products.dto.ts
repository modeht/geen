import { Type } from 'class-transformer';
import {
	IsOptional,
	IsBooleanString,
	IsString,
	IsNumber,
	IsPositive,
	Min,
} from 'class-validator';
import { FindProductsDto } from './find-prodcuts.dto';

export class BrandFindProductsDto extends FindProductsDto {
	@IsOptional()
	@Type(() => Number)
	categoryId?: number;

	@IsOptional()
	@Type(() => Number)
	subCategoryId?: number;

	@IsOptional()
	@IsBooleanString()
	isFeatured?: boolean;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	@Min(0)
	minPrice?: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Type(() => Number)
	maxPrice?: number;
}
