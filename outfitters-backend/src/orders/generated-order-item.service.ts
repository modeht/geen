import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateOrderItemSchema, { TCreateOrderItemSchemaInput, TCreateOrderItemSchemaOutput } from './generated-schemas//create-order-item.schema'
import UpdateOrderItemSchema, { TUpdateOrderItemSchemaInput, TUpdateOrderItemSchemaOutput } from './generated-schemas//update-order-item.schema'
import ReadOrderItemSchema, { TReadOrderItemSchemaInput, TReadOrderItemSchemaOutput } from './generated-schemas//read-order-item-query.schema'
import { OrderItemEntity } from './entities/order-item.entity'

@Injectable()
export class OrderItemService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateOrderItemSchemaOutput){
				return await this.service.create(OrderItemEntity, body);
			}

			async updateRow(id: number, body: TUpdateOrderItemSchemaOutput){
				return await this.service.update(OrderItemEntity, id, body);
			}

			async readRows(query: TReadOrderItemSchemaOutput){
				return await this.service.read(OrderItemEntity, query);
			}
		
}
