import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
	isArray,
	IsArray,
	IsBooleanString,
	IsEnum,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { NestedRelationPaths } from 'src/globals/lib/type-helpers';
import { ProductEntity } from '../entities/product.entity';

export type ProductQueryableRelations = NestedRelationPaths<ProductEntity, '', 3>[];

export const productrQueryableRelations = [
	'media',
	'category',
	'subCategory',
	'taggedIn',
	'brand',
	'brand.cover',
	'brand.logo',
	'options.values',
	'variants',
	'variants.media',
	'variants.optionValues',
] as const satisfies ProductQueryableRelations;

export enum ProductSortBy {
	Newest = 'newest',
	PriceLowToHigh = 'priceLowToHigh',
	PriceHighToLow = 'priceHighToLow',
	AtoZ = 'aToZ',
	ZtoA = 'zToA',
	Rating = 'rating',
}
// Remove validation because FE does not know the difference between null and undefined
export class FindProductsDto {
	@IsOptional()
	@Transform(({ value }) => {
		if (Array.isArray(value)) {
			value = value.map(Number);
		} else {
			value = [value];
		}
		value = value.map(Number);
		value = value.filter((val) => !!val);
		return value.length ? value : undefined;
	})
	brandId?: number[];

	@IsOptional()
	@Transform(({ value }) => (value ? Number(value) : undefined))
	categoryId?: number;

	@IsOptional()
	@Transform(({ value }) => (value ? Number(value) : undefined))
	subCategoryId?: number;

	@IsOptional()
	@IsBooleanString()
	isFeatured?: boolean;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@Transform(({ value }) => (value ? Number(value) : undefined))
	minPrice?: number;

	@IsOptional()
	@Transform(({ value }) => (value ? Number(value) : undefined))
	maxPrice?: number;

	@IsOptional()
	@Transform(({ value }) => (value ? Number(value) : undefined))
	rating?: number;

	@ApiProperty({
		enum: ProductSortBy,
		default: ProductSortBy.Newest,
		description: Object.values(ProductSortBy).join(','),
	})
	@IsOptional()
	@IsEnum(ProductSortBy)
	sortBy?: ProductSortBy = ProductSortBy.Newest;

	@ApiProperty({
		type: Array<FindOptionDto>,
		required: false,
		description:
			'JSON stringified array of FindOptionDto, e.g. [{"name":"color","values":["red","blue"]}]',
	})
	@IsOptional()
	@Transform(({ value }) => {
		return value == null ? null : isArray(value) ? value : JSON.parse(value);
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => FindOptionDto)
	options?: FindOptionDto[];
}

export class FindOptionDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	values: string[];
}
