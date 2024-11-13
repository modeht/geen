import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateCartItemsEntityDto } from './generated-dtos/create/create-cart-items-entity.dto'
import { CartItemsEntity } from './entities/cart-item.entity'

@Injectable()
export class CartItemsService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateCartItemsEntityDto){
				return await this.service.create(CartItemsEntity, CreateCartItemsEntityDto, body);
			}
		
}
