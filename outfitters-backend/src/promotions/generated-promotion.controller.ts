import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreatePromotionSchema, { TCreatePromotionSchemaInput, TCreatePromotionSchemaOutput } from './generated-schemas//create-promotion.schema'
import UpdatePromotionSchema, { TUpdatePromotionSchemaInput, TUpdatePromotionSchemaOutput } from './generated-schemas//update-promotion.schema'
import ReadPromotionSchema, { TReadPromotionSchemaInput, TReadPromotionSchemaOutput } from './generated-schemas//read-promotion-query.schema'
import { PromotionEntity } from './entities/promotion.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { PromotionService } from './generated-promotion.service'

@Controller('promotion')
export class PromotionController {
  
  constructor(private service: PromotionService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreatePromotion
				}
			})
			async create(
				@MoBody(CreatePromotionSchema) body: TCreatePromotionSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdatePromotion
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdatePromotionSchema) body: TUpdatePromotionSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadPromotionQuery
				}
			})
			async read(
				@MoQuery(ReadPromotionSchema) query: TReadPromotionSchemaOutput,
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
