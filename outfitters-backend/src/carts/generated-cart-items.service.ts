import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddCartItemsEntityDto } from './generated-dtos/add-cart-items-entity.dto'
import { CartItemsEntity } from './entities/cart-item.entity'

@Injectable()
export class CartItemsService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddCartItemsEntityDto){
				return await this.service.create(CartItemsEntity, AddCartItemsEntityDto, body);
			}
		
}
