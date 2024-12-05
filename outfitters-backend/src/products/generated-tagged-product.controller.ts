import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateTaggedProductSchema, { TCreateTaggedProductSchemaInput, TCreateTaggedProductSchemaOutput } from './generated-schemas//create-tagged-product.schema'
import UpdateTaggedProductSchema, { TUpdateTaggedProductSchemaInput, TUpdateTaggedProductSchemaOutput } from './generated-schemas//update-tagged-product.schema'
import ReadTaggedProductSchema, { TReadTaggedProductSchemaInput, TReadTaggedProductSchemaOutput } from './generated-schemas//read-tagged-product-query.schema'
import { TaggedProductEntity } from './entities/tagged-product.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { TaggedProductService } from './generated-tagged-product.service'

@Controller('tagged-product')
export class TaggedProductController {
  
  constructor(private service: TaggedProductService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateTaggedProduct
				}
			})
			async create(
				@MoBody(CreateTaggedProductSchema) body: TCreateTaggedProductSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateTaggedProduct
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateTaggedProductSchema) body: TUpdateTaggedProductSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadTaggedProductQuery
				}
			})
			async read(
				@MoQuery(ReadTaggedProductSchema) query: TReadTaggedProductSchemaOutput,
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
