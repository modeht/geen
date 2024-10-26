import { Type } from 'class-transformer';
import { IsBooleanString, IsNumber, IsOptional, IsString } from 'class-validator';
import { NestedRelationPaths } from 'src/globals/lib/type-helpers';
import { CollectionEntity } from '../entities/collection.entity';

export type CollectionQueryableRelations = NestedRelationPaths<CollectionEntity, '', 2>[];

export const collectionQueryableRelations = [
	'cover',
	'brand',
	'brand.logo',
	'products',
	'products.media',
	'products.category',
	'products.subCategory',
] as const satisfies CollectionQueryableRelations;

export class FindCollectionsDto {
	@IsOptional()
	@IsBooleanString()
	isFeatured?: boolean;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	brandId?: number;

	@IsOptional()
	@IsString()
	brandName?: string;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	categoryId?: number;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	subcategoryId?: number;
}
