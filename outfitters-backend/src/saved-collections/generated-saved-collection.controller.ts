import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateSavedCollectionSchema, { TCreateSavedCollectionSchemaInput, TCreateSavedCollectionSchemaOutput } from './generated-schemas//create-saved-collection.schema'
import UpdateSavedCollectionSchema, { TUpdateSavedCollectionSchemaInput, TUpdateSavedCollectionSchemaOutput } from './generated-schemas//update-saved-collection.schema'
import ReadSavedCollectionSchema, { TReadSavedCollectionSchemaInput, TReadSavedCollectionSchemaOutput } from './generated-schemas//read-saved-collection-query.schema'
import { SavedCollectionEntity } from './entities/saved-collection.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { SavedCollectionService } from './generated-saved-collection.service'

@Controller('saved-collection')
export class SavedCollectionController {
  
  constructor(private service: SavedCollectionService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateSavedCollection
				}
			})
			async create(
				@MoBody(CreateSavedCollectionSchema) body: TCreateSavedCollectionSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateSavedCollection
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateSavedCollectionSchema) body: TUpdateSavedCollectionSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadSavedCollectionQuery
				}
			})
			async read(
				@MoQuery(ReadSavedCollectionSchema) query: TReadSavedCollectionSchemaOutput,
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
