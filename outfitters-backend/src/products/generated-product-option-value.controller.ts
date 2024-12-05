import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateProductOptionValueSchema, { TCreateProductOptionValueSchemaInput, TCreateProductOptionValueSchemaOutput } from './generated-schemas//create-product-option-value.schema'
import UpdateProductOptionValueSchema, { TUpdateProductOptionValueSchemaInput, TUpdateProductOptionValueSchemaOutput } from './generated-schemas//update-product-option-value.schema'
import ReadProductOptionValueSchema, { TReadProductOptionValueSchemaInput, TReadProductOptionValueSchemaOutput } from './generated-schemas//read-product-option-value-query.schema'
import { ProductOptionValueEntity } from './entities/product-option-value.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { ProductOptionValueService } from './generated-product-option-value.service'

@Controller('product-option-value')
export class ProductOptionValueController {
  
  constructor(private service: ProductOptionValueService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateProductOptionValue
				}
			})
			async create(
				@MoBody(CreateProductOptionValueSchema) body: TCreateProductOptionValueSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateProductOptionValue
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateProductOptionValueSchema) body: TUpdateProductOptionValueSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadProductOptionValueQuery
				}
			})
			async read(
				@MoQuery(ReadProductOptionValueSchema) query: TReadProductOptionValueSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		

			@Delete(':id')
			async delete(
				@Param('id') id: string,
			) {
				return this.service.deleteRow(+id);
			}
		

			@Delete(':id/soft')
			async delete(
				@Param('id') id: string,
			) {
				return this.service.softDeleteRow(+id);
			}
		
}
