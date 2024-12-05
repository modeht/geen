import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateProductSchema, { TCreateProductSchemaInput, TCreateProductSchemaOutput } from './generated-schemas//create-product.schema'
import UpdateProductSchema, { TUpdateProductSchemaInput, TUpdateProductSchemaOutput } from './generated-schemas//update-product.schema'
import ReadProductSchema, { TReadProductSchemaInput, TReadProductSchemaOutput } from './generated-schemas//read-product-query.schema'
import { ProductEntity } from './entities/product.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { ProductService } from './generated-product.service'

@Controller('product')
export class ProductController {
  
  constructor(private service: ProductService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateProduct
				}
			})
			async create(
				@MoBody(CreateProductSchema) body: TCreateProductSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateProduct
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateProductSchema) body: TUpdateProductSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadProductQuery
				}
			})
			async read(
				@MoQuery(ReadProductSchema) query: TReadProductSchemaOutput,
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
			async softDelete(
				@Param('id') id: string,
			) {
				return this.service.softDeleteRow(+id);
			}
		
}
