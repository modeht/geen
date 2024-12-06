import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateProductVariantSchema, {
	TCreateProductVariantSchemaInput,
	TCreateProductVariantSchemaOutput,
} from './generated-schemas//create-product-variant.schema';
import UpdateProductVariantSchema, {
	TUpdateProductVariantSchemaInput,
	TUpdateProductVariantSchemaOutput,
} from './generated-schemas//update-product-variant.schema';
import ReadProductVariantSchema, {
	TReadProductVariantSchemaInput,
	TReadProductVariantSchemaOutput,
} from './generated-schemas//read-product-variant-query.schema';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../globals/decorators/mo-body.decorator';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { ProductVariantService } from './generated-product-variant.service';

@Controller('product-variant')
export class ProductVariantController {
	constructor(private service: ProductVariantService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateProductVariant,
		},
	})
	async create(@MoBody(CreateProductVariantSchema) body: TCreateProductVariantSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateProductVariant,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateProductVariantSchema) body: TUpdateProductVariantSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadProductVariantQuery,
		},
	})
	async read(@MoQuery(ReadProductVariantSchema) query: TReadProductVariantSchemaOutput) {
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
