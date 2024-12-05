import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateAffiliationLinkSchema, { TCreateAffiliationLinkSchemaInput, TCreateAffiliationLinkSchemaOutput } from './generated-schemas//create-affiliation-link.schema'
import UpdateAffiliationLinkSchema, { TUpdateAffiliationLinkSchemaInput, TUpdateAffiliationLinkSchemaOutput } from './generated-schemas//update-affiliation-link.schema'
import ReadAffiliationLinkSchema, { TReadAffiliationLinkSchemaInput, TReadAffiliationLinkSchemaOutput } from './generated-schemas//read-affiliation-link-query.schema'
import { AffiliationLinkEntity } from './entities/affiliation-link.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { AffiliationLinkService } from './generated-affiliation-link.service'

@Controller('affiliation-link')
export class AffiliationLinkController {
  
  constructor(private service: AffiliationLinkService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateAffiliationLink
				}
			})
			async create(
				@MoBody(CreateAffiliationLinkSchema) body: TCreateAffiliationLinkSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateAffiliationLink
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateAffiliationLinkSchema) body: TUpdateAffiliationLinkSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadAffiliationLinkQuery
				}
			})
			async read(
				@MoQuery(ReadAffiliationLinkSchema) query: TReadAffiliationLinkSchemaOutput,
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
