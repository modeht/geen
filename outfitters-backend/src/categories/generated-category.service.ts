import { Injectable } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import { AddCategoryEntityDto } from './generated-dtos/create/create-category-entity.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: AddCategoryEntityDto) {
		return await this.service.create(CategoryEntity, AddCategoryEntityDto, body);
	}

	async readRow() {
		//
		const row = this.datasource.manager.findOne(CategoryEntity, {});
	}
}

/**
 * how to filter
 * name of the field and type
 * allowed operator for that type
 * field types:
 * string, numbers, array? (i don't think support this now), complex (nested objects)
 * strings operators
 * contains
 * startsWith
 * endsWith
 * isNull,
 * isNotNull,
 * is
 * isNot
 * numbers operators
 * is
 * isNot
 * gt
 * lt
 * gte
 * lte
 * isNull
 * isNotNull
 *
 */

enum StringOperators {
	Is,
	IsNot,
}

enum CategoryFilterableFields {
	name = 'string@name',
}

class FilterField {
	value?: string | number | null | undefined;
	operator: StringOperators;
}
class CategoryFilters {
	// @FilterType('string')
	name: FilterField;
}
export class FindCategoryDto {
	filters: CategoryFilters[];
}
