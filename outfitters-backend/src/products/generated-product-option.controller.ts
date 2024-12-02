import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateProductOptionSchema, { TCreateProductOptionSchemaInput, TCreateProductOptionSchemaOutput } from './generated-schemas//create-product-option.schema'
import UpdateProductOptionSchema, { TUpdateProductOptionSchemaInput, TUpdateProductOptionSchemaOutput } from './generated-schemas//update-product-option.schema'
import ReadProductOptionSchema, { TReadProductOptionSchemaInput, TReadProductOptionSchemaOutput } from './generated-schemas//read-product-option-query.schema'
import { ProductOptionEntity } from './entities/product-option.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { ProductOptionService } from './generated-product-option.service'

@Controller('product-option')
export class ProductOptionController {
  
  constructor(private service: ProductOptionService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateProductOption
				}
			})
			async create(
				@MoBody(CreateProductOptionSchema) body: TCreateProductOptionSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateProductOption
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateProductOptionSchema) body: TUpdateProductOptionSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadProductOptionQuery
				}
			})
			async read(
				@MoQuery(ReadProductOptionSchema) query: TReadProductOptionSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
