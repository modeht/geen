import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { CategoryFilterService } from './generated-category-filter.service';

@Controller('category-filter')
export class CategoryFilterController {
	constructor(private service: CategoryFilterService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateCategoryFilter,
		},
	})
	async create(@MoBody(CreateCategoryFilterSchema) body: TCreateCategoryFilterSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateCategoryFilter,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateCategoryFilterSchema) body: TUpdateCategoryFilterSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadCategoryFilterQuery,
		},
	})
	async read(@MoQuery(ReadCategoryFilterSchema) query: TReadCategoryFilterSchemaOutput) {
		return this.service.readRows(query);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.service.deleteRow(+id);
	}

	@Delete(':id/soft')
	async softDelete(@Param('id') id: string) {
		return this.service.softDeleteRow(+id);
	}
}
