import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreatePromoCodeSchema, { TCreatePromoCodeSchemaInput, TCreatePromoCodeSchemaOutput } from './generated-schemas//create-promo-code.schema'
import UpdatePromoCodeSchema, { TUpdatePromoCodeSchemaInput, TUpdatePromoCodeSchemaOutput } from './generated-schemas//update-promo-code.schema'
import ReadPromoCodeSchema, { TReadPromoCodeSchemaInput, TReadPromoCodeSchemaOutput } from './generated-schemas//read-promo-code-query.schema'
import { PromoCodeEntity } from './entities/promo-code.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { PromoCodeService } from './generated-promo-code.service'

@Controller('promo-code')
export class PromoCodeController {
  
  constructor(private service: PromoCodeService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreatePromoCode
				}
			})
			async create(
				@MoBody(CreatePromoCodeSchema) body: TCreatePromoCodeSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdatePromoCode
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdatePromoCodeSchema) body: TUpdatePromoCodeSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadPromoCodeQuery
				}
			})
			async read(
				@MoQuery(ReadPromoCodeSchema) query: TReadPromoCodeSchemaOutput,
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
