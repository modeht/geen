import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateCollectionSchema, { TCreateCollectionSchemaInput, TCreateCollectionSchemaOutput } from './generated-schemas//create-collection.schema'
import UpdateCollectionSchema, { TUpdateCollectionSchemaInput, TUpdateCollectionSchemaOutput } from './generated-schemas//update-collection.schema'
import ReadCollectionSchema, { TReadCollectionSchemaInput, TReadCollectionSchemaOutput } from './generated-schemas//read-collection-query.schema'
import { CollectionEntity } from './entities/collection.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { CollectionService } from './generated-collection.service'

@Controller('collection')
export class CollectionController {
  
  constructor(private service: CollectionService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateCollection
				}
			})
			async create(
				@MoBody(CreateCollectionSchema) body: TCreateCollectionSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateCollection
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateCollectionSchema) body: TUpdateCollectionSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadCollectionQuery
				}
			})
			async read(
				@MoQuery(ReadCollectionSchema) query: TReadCollectionSchemaOutput,
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
