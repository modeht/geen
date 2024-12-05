import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateStorySchema, { TCreateStorySchemaInput, TCreateStorySchemaOutput } from './generated-schemas//create-story.schema'
import UpdateStorySchema, { TUpdateStorySchemaInput, TUpdateStorySchemaOutput } from './generated-schemas//update-story.schema'
import ReadStorySchema, { TReadStorySchemaInput, TReadStorySchemaOutput } from './generated-schemas//read-story-query.schema'
import { StoryEntity } from './entities/story.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { StoryService } from './generated-story.service'

@Controller('story')
export class StoryController {
  
  constructor(private service: StoryService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateStory
				}
			})
			async create(
				@MoBody(CreateStorySchema) body: TCreateStorySchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateStory
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateStorySchema) body: TUpdateStorySchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadStoryQuery
				}
			})
			async read(
				@MoQuery(ReadStorySchema) query: TReadStorySchemaOutput,
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
