import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateTranslationSchema, { TCreateTranslationSchemaInput, TCreateTranslationSchemaOutput } from './generated-schemas//create-translation.schema'
import UpdateTranslationSchema, { TUpdateTranslationSchemaInput, TUpdateTranslationSchemaOutput } from './generated-schemas//update-translation.schema'
import ReadTranslationSchema, { TReadTranslationSchemaInput, TReadTranslationSchemaOutput } from './generated-schemas//read-translation-query.schema'
import { TranslationEntity } from './entities/translation.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { TranslationService } from './generated-translation.service'

@Controller('translation')
export class TranslationController {
  
  constructor(private service: TranslationService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateTranslation
				}
			})
			async create(
				@MoBody(CreateTranslationSchema) body: TCreateTranslationSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateTranslation
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateTranslationSchema) body: TUpdateTranslationSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadTranslationQuery
				}
			})
			async read(
				@MoQuery(ReadTranslationSchema) query: TReadTranslationSchemaOutput,
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
