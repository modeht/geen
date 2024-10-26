import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { NestedRelationPaths } from 'src/globals/lib/type-helpers';
import { CategoryEntity } from '../entities/category.entity';

export type CategoryQueryableRelations = NestedRelationPaths<CategoryEntity, '', 1>[];

export const categoryQueryableRelations = [
	'subCategories',
	'superCategory',
] as const satisfies CategoryQueryableRelations;

export class FindCategoryDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	superCategoryId?: number;
}
