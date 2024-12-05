import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateAffiliationLinkTrackingSchema, { TCreateAffiliationLinkTrackingSchemaInput, TCreateAffiliationLinkTrackingSchemaOutput } from './generated-schemas//create-affiliation-link-tracking.schema'
import UpdateAffiliationLinkTrackingSchema, { TUpdateAffiliationLinkTrackingSchemaInput, TUpdateAffiliationLinkTrackingSchemaOutput } from './generated-schemas//update-affiliation-link-tracking.schema'
import ReadAffiliationLinkTrackingSchema, { TReadAffiliationLinkTrackingSchemaInput, TReadAffiliationLinkTrackingSchemaOutput } from './generated-schemas//read-affiliation-link-tracking-query.schema'
import { AffiliationLinkTrackingEntity } from './entities/affiliation-link-tracking.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { AffiliationLinkTrackingService } from './generated-affiliation-link-tracking.service'

@Controller('affiliation-link-tracking')
export class AffiliationLinkTrackingController {
  
  constructor(private service: AffiliationLinkTrackingService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateAffiliationLinkTracking
				}
			})
			async create(
				@MoBody(CreateAffiliationLinkTrackingSchema) body: TCreateAffiliationLinkTrackingSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateAffiliationLinkTracking
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateAffiliationLinkTrackingSchema) body: TUpdateAffiliationLinkTrackingSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadAffiliationLinkTrackingQuery
				}
			})
			async read(
				@MoQuery(ReadAffiliationLinkTrackingSchema) query: TReadAffiliationLinkTrackingSchemaOutput,
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
