import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddOrderItemEntityDto } from './generated-dtos/create/create-order-item-entity.dto'
import { OrderItemEntity } from './entities/order-item.entity'

@Injectable()
export class OrderItemService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddOrderItemEntityDto){
				return await this.service.create(OrderItemEntity, AddOrderItemEntityDto, body);
			}
		
}