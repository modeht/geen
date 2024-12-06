import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateCategorySchema, {
	TCreateCategorySchemaInput,
	TCreateCategorySchemaOutput,
} from './generated-schemas//create-category.schema';
import UpdateCategorySchema, {
	TUpdateCategorySchemaInput,
	TUpdateCategorySchemaOutput,
} from './generated-schemas//update-category.schema';
import ReadCategorySchema, {
	TReadCategorySchemaInput,
	TReadCategorySchemaOutput,
} from './generated-schemas//read-category-query.schema';
import { CategoryEntity } from './entities/category.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../globals/decorators/mo-body.decorator';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { CategoryService } from './generated-category.service';

@Controller('category')
export class CategoryController {
	constructor(private service: CategoryService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateCategory,
		},
	})
	async create(@MoBody(CreateCategorySchema) body: TCreateCategorySchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateCategory,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateCategorySchema) body: TUpdateCategorySchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadCategoryQuery,
		},
	})
	async read(@MoQuery(ReadCategorySchema) query: TReadCategorySchemaOutput) {
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
