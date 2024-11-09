import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddCartEntityDto } from './generated-dtos/create/create-cart-entity.dto'
import { CartEntity } from './entities/cart.entity'

@Injectable()
export class CartService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddCartEntityDto){
				return await this.service.create(CartEntity, AddCartEntityDto, body);
			}
		
}
