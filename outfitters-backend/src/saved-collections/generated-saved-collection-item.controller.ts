import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateSavedCollectionItemSchema, { TCreateSavedCollectionItemSchemaInput, TCreateSavedCollectionItemSchemaOutput } from './generated-schemas//create-saved-collection-item.schema'
import UpdateSavedCollectionItemSchema, { TUpdateSavedCollectionItemSchemaInput, TUpdateSavedCollectionItemSchemaOutput } from './generated-schemas//update-saved-collection-item.schema'
import ReadSavedCollectionItemSchema, { TReadSavedCollectionItemSchemaInput, TReadSavedCollectionItemSchemaOutput } from './generated-schemas//read-saved-collection-item-query.schema'
import { SavedCollectionItemEntity } from './entities/saved-collection-item.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { SavedCollectionItemService } from './generated-saved-collection-item.service'

@Controller('saved-collection-item')
export class SavedCollectionItemController {
  
  constructor(private service: SavedCollectionItemService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateSavedCollectionItem
				}
			})
			async create(
				@MoBody(CreateSavedCollectionItemSchema) body: TCreateSavedCollectionItemSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateSavedCollectionItem
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateSavedCollectionItemSchema) body: TUpdateSavedCollectionItemSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadSavedCollectionItemQuery
				}
			})
			async read(
				@MoQuery(ReadSavedCollectionItemSchema) query: TReadSavedCollectionItemSchemaOutput,
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
