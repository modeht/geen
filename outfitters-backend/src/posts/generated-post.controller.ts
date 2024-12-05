import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreatePostSchema, { TCreatePostSchemaInput, TCreatePostSchemaOutput } from './generated-schemas//create-post.schema'
import UpdatePostSchema, { TUpdatePostSchemaInput, TUpdatePostSchemaOutput } from './generated-schemas//update-post.schema'
import ReadPostSchema, { TReadPostSchemaInput, TReadPostSchemaOutput } from './generated-schemas//read-post-query.schema'
import { PostEntity } from './entities/post.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { PostService } from './generated-post.service'

@Controller('post')
export class PostController {
  
  constructor(private service: PostService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreatePost
				}
			})
			async create(
				@MoBody(CreatePostSchema) body: TCreatePostSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdatePost
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdatePostSchema) body: TUpdatePostSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadPostQuery
				}
			})
			async read(
				@MoQuery(ReadPostSchema) query: TReadPostSchemaOutput,
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
