import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateProductsSchema, {
	TCreateProductsSchemaInput,
	TCreateProductsSchemaOutput,
} from './generated-schemas//create-products.schema';
import UpdateProductsSchema, {
	TUpdateProductsSchemaInput,
	TUpdateProductsSchemaOutput,
} from './generated-schemas//update-products.schema';
import ReadProductsSchema, {
	TReadProductsSchemaInput,
	TReadProductsSchemaOutput,
} from './generated-schemas//read-products-query.schema';
import ReadOneProductsSchema, {
	TReadOneProductsSchemaInput,
	TReadOneProductsSchemaOutput,
} from './generated-schemas//read-one-products-query.schema';
import { ProductsEntity } from './entities/products.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { ProductsService } from './generated-products.service';

@Controller('products')
export class ProductsController {
	constructor(private service: ProductsService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateProducts,
		},
	})
	async create(@MoBody(CreateProductsSchema) body: TCreateProductsSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateProducts,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateProductsSchema) body: TUpdateProductsSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadProductsQuery,
		},
	})
	async read(@MoQuery(ReadProductsSchema) query: TReadProductsSchemaOutput) {
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

	@Get(':id')
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadOneProductsQuery,
		},
	})
	async readOne(@Param('id') id: string, @MoQuery(ReadOneProductsSchema) query: TReadOneProductsSchemaOutput) {
		return this.service.readOneRow(+id, query);
	}
}
