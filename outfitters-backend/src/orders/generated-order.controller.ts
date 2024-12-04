import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateOrderSchema, { TCreateOrderSchemaInput, TCreateOrderSchemaOutput } from './generated-schemas//create-order.schema'
import UpdateOrderSchema, { TUpdateOrderSchemaInput, TUpdateOrderSchemaOutput } from './generated-schemas//update-order.schema'
import ReadOrderSchema, { TReadOrderSchemaInput, TReadOrderSchemaOutput } from './generated-schemas//read-order-query.schema'
import { OrderEntity } from './entities/order.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { OrderService } from './generated-order.service'

@Controller('order')
export class OrderController {
  
  constructor(private service: OrderService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateOrder
				}
			})
			async create(
				@MoBody(CreateOrderSchema) body: TCreateOrderSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateOrder
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateOrderSchema) body: TUpdateOrderSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadOrderQuery
				}
			})
			async read(
				@MoQuery(ReadOrderSchema) query: TReadOrderSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		
}
