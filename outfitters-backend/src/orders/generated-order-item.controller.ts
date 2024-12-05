import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateOrderItemSchema, { TCreateOrderItemSchemaInput, TCreateOrderItemSchemaOutput } from './generated-schemas//create-order-item.schema'
import UpdateOrderItemSchema, { TUpdateOrderItemSchemaInput, TUpdateOrderItemSchemaOutput } from './generated-schemas//update-order-item.schema'
import ReadOrderItemSchema, { TReadOrderItemSchemaInput, TReadOrderItemSchemaOutput } from './generated-schemas//read-order-item-query.schema'
import { OrderItemEntity } from './entities/order-item.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { OrderItemService } from './generated-order-item.service'

@Controller('order-item')
export class OrderItemController {
  
  constructor(private service: OrderItemService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateOrderItem
				}
			})
			async create(
				@MoBody(CreateOrderItemSchema) body: TCreateOrderItemSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateOrderItem
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateOrderItemSchema) body: TUpdateOrderItemSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadOrderItemQuery
				}
			})
			async read(
				@MoQuery(ReadOrderItemSchema) query: TReadOrderItemSchemaOutput,
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
