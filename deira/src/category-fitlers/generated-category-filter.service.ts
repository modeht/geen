import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateCategoryFilterSchema, {
	TCreateCategoryFilterSchemaInput,
	TCreateCategoryFilterSchemaOutput,
} from './generated-schemas//create-category-filter.schema';
import UpdateCategoryFilterSchema, {
	TUpdateCategoryFilterSchemaInput,
	TUpdateCategoryFilterSchemaOutput,
} from './generated-schemas//update-category-filter.schema';
import ReadCategoryFilterSchema, {
	TReadCategoryFilterSchemaInput,
	TReadCategoryFilterSchemaOutput,
} from './generated-schemas//read-category-filter-query.schema';
import { CategoryFilterEntity } from './entities/category-filters.entity';

@Injectable()
export class CategoryFilterService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateCategoryFilterSchemaOutput) {
		return await this.service.create(CategoryFilterEntity, body);
	}

	async updateRow(id: number, body: TUpdateCategoryFilterSchemaOutput) {
		return await this.service.update(CategoryFilterEntity, id, body);
	}

	async readRows(query: TReadCategoryFilterSchemaOutput) {
		return await this.service.read(CategoryFilterEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(CategoryFilterEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(CategoryFilterEntity, id, { soft: true });
	}
}
