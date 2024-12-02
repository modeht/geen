import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateMediaSchema, { TCreateMediaSchemaInput, TCreateMediaSchemaOutput } from './generated-schemas//create-media.schema'
import UpdateMediaSchema, { TUpdateMediaSchemaInput, TUpdateMediaSchemaOutput } from './generated-schemas//update-media.schema'
import ReadMediaSchema, { TReadMediaSchemaInput, TReadMediaSchemaOutput } from './generated-schemas//read-media-query.schema'
import { MediaEntity } from './entities/media.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { MediaService } from './generated-media.service'

@Controller('media')
export class MediaController {
  
  constructor(private service: MediaService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateMedia
				}
			})
			async create(
				@MoBody(CreateMediaSchema) body: TCreateMediaSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateMedia
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateMediaSchema) body: TUpdateMediaSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadMediaQuery
				}
			})
			async read(
				@MoQuery(ReadMediaSchema) query: TReadMediaSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
