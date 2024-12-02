import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateBrandOrderSchema, { TCreateBrandOrderSchemaInput, TCreateBrandOrderSchemaOutput } from './generated-schemas//create-brand-order.schema'
import UpdateBrandOrderSchema, { TUpdateBrandOrderSchemaInput, TUpdateBrandOrderSchemaOutput } from './generated-schemas//update-brand-order.schema'
import ReadBrandOrderSchema, { TReadBrandOrderSchemaInput, TReadBrandOrderSchemaOutput } from './generated-schemas//read-brand-order-query.schema'
import { BrandOrderEntity } from './entities/brand-orders.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { BrandOrderService } from './generated-brand-order.service'

@Controller('brand-order')
export class BrandOrderController {
  
  constructor(private service: BrandOrderService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateBrandOrder
				}
			})
			async create(
				@MoBody(CreateBrandOrderSchema) body: TCreateBrandOrderSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateBrandOrder
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateBrandOrderSchema) body: TUpdateBrandOrderSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadBrandOrderQuery
				}
			})
			async read(
				@MoQuery(ReadBrandOrderSchema) query: TReadBrandOrderSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
