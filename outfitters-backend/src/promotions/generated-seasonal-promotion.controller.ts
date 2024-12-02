import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateSeasonalPromotionSchema, { TCreateSeasonalPromotionSchemaInput, TCreateSeasonalPromotionSchemaOutput } from './generated-schemas//create-seasonal-promotion.schema'
import UpdateSeasonalPromotionSchema, { TUpdateSeasonalPromotionSchemaInput, TUpdateSeasonalPromotionSchemaOutput } from './generated-schemas//update-seasonal-promotion.schema'
import ReadSeasonalPromotionSchema, { TReadSeasonalPromotionSchemaInput, TReadSeasonalPromotionSchemaOutput } from './generated-schemas//read-seasonal-promotion-query.schema'
import { SeasonalPromotionEntity } from './entities/seasonal-promotion.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { SeasonalPromotionService } from './generated-seasonal-promotion.service'

@Controller('seasonal-promotion')
export class SeasonalPromotionController {
  
  constructor(private service: SeasonalPromotionService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateSeasonalPromotion
				}
			})
			async create(
				@MoBody(CreateSeasonalPromotionSchema) body: TCreateSeasonalPromotionSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateSeasonalPromotion
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateSeasonalPromotionSchema) body: TUpdateSeasonalPromotionSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadSeasonalPromotionQuery
				}
			})
			async read(
				@MoQuery(ReadSeasonalPromotionSchema) query: TReadSeasonalPromotionSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
