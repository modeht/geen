import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateOrderEntityDto } from './generated-dtos/create/create-order-entity.dto'
import { OrderEntity } from './entities/order.entity'

@Injectable()
export class OrderService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateOrderEntityDto){
				return await this.service.create(OrderEntity, CreateOrderEntityDto, body);
			}
		
}
