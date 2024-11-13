import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateCartEntityDto } from './generated-dtos/create/create-cart-entity.dto'
import { CartEntity } from './entities/cart.entity'

@Injectable()
export class CartService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateCartEntityDto){
				return await this.service.create(CartEntity, CreateCartEntityDto, body);
			}
		
}
