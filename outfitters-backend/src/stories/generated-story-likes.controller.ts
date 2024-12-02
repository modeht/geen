import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateStoryLikesSchema, { TCreateStoryLikesSchemaInput, TCreateStoryLikesSchemaOutput } from './generated-schemas//create-story-likes.schema'
import UpdateStoryLikesSchema, { TUpdateStoryLikesSchemaInput, TUpdateStoryLikesSchemaOutput } from './generated-schemas//update-story-likes.schema'
import ReadStoryLikesSchema, { TReadStoryLikesSchemaInput, TReadStoryLikesSchemaOutput } from './generated-schemas//read-story-likes-query.schema'
import { StoryLikesEntity } from './entities/stories-likes.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { StoryLikesService } from './generated-story-likes.service'

@Controller('story-likes')
export class StoryLikesController {
  
  constructor(private service: StoryLikesService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateStoryLikes
				}
			})
			async create(
				@MoBody(CreateStoryLikesSchema) body: TCreateStoryLikesSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateStoryLikes
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateStoryLikesSchema) body: TUpdateStoryLikesSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadStoryLikesQuery
				}
			})
			async read(
				@MoQuery(ReadStoryLikesSchema) query: TReadStoryLikesSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
