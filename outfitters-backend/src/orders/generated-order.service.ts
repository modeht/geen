import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddOrderEntityDto } from './generated-dtos/add-order-entity.dto'
import { OrderEntity } from './entities/order.entity'

@Injectable()
export class OrderService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddOrderEntityDto){
				return await this.service.create(OrderEntity, AddOrderEntityDto, body);
			}
		
}
