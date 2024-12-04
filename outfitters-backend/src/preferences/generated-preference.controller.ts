import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreatePreferenceSchema, { TCreatePreferenceSchemaInput, TCreatePreferenceSchemaOutput } from './generated-schemas//create-preference.schema'
import UpdatePreferenceSchema, { TUpdatePreferenceSchemaInput, TUpdatePreferenceSchemaOutput } from './generated-schemas//update-preference.schema'
import ReadPreferenceSchema, { TReadPreferenceSchemaInput, TReadPreferenceSchemaOutput } from './generated-schemas//read-preference-query.schema'
import { PreferenceEntity } from './entities/preference.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { PreferenceService } from './generated-preference.service'

@Controller('preference')
export class PreferenceController {
  
  constructor(private service: PreferenceService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreatePreference
				}
			})
			async create(
				@MoBody(CreatePreferenceSchema) body: TCreatePreferenceSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdatePreference
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdatePreferenceSchema) body: TUpdatePreferenceSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadPreferenceQuery
				}
			})
			async read(
				@MoQuery(ReadPreferenceSchema) query: TReadPreferenceSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
