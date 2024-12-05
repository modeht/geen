import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreatePostLikesSchema, { TCreatePostLikesSchemaInput, TCreatePostLikesSchemaOutput } from './generated-schemas//create-post-likes.schema'
import UpdatePostLikesSchema, { TUpdatePostLikesSchemaInput, TUpdatePostLikesSchemaOutput } from './generated-schemas//update-post-likes.schema'
import ReadPostLikesSchema, { TReadPostLikesSchemaInput, TReadPostLikesSchemaOutput } from './generated-schemas//read-post-likes-query.schema'
import { PostLikesEntity } from './entities/posts-likes.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { PostLikesService } from './generated-post-likes.service'

@Controller('post-likes')
export class PostLikesController {
  
  constructor(private service: PostLikesService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreatePostLikes
				}
			})
			async create(
				@MoBody(CreatePostLikesSchema) body: TCreatePostLikesSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdatePostLikes
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdatePostLikesSchema) body: TUpdatePostLikesSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadPostLikesQuery
				}
			})
			async read(
				@MoQuery(ReadPostLikesSchema) query: TReadPostLikesSchemaOutput,
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
