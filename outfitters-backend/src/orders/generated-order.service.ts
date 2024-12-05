import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateOrderSchema, { TCreateOrderSchemaInput, TCreateOrderSchemaOutput } from './generated-schemas//create-order.schema'
import UpdateOrderSchema, { TUpdateOrderSchemaInput, TUpdateOrderSchemaOutput } from './generated-schemas//update-order.schema'
import ReadOrderSchema, { TReadOrderSchemaInput, TReadOrderSchemaOutput } from './generated-schemas//read-order-query.schema'
import { OrderEntity } from './entities/order.entity'

@Injectable()
export class OrderService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateOrderSchemaOutput){
				return await this.service.create(OrderEntity, body);
			}

			async updateRow(id: number, body: TUpdateOrderSchemaOutput){
				return await this.service.update(OrderEntity, id, body);
			}

			async readRows(query: TReadOrderSchemaOutput){
				return await this.service.read(OrderEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(OrderEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(OrderEntity, id, { soft: true });
			}
		
}
