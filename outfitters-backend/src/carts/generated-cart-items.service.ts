import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateCartItemsSchema, { TCreateCartItemsSchemaInput, TCreateCartItemsSchemaOutput } from './generated-schemas//create-cart-items.schema'
import UpdateCartItemsSchema, { TUpdateCartItemsSchemaInput, TUpdateCartItemsSchemaOutput } from './generated-schemas//update-cart-items.schema'
import ReadCartItemsSchema, { TReadCartItemsSchemaInput, TReadCartItemsSchemaOutput } from './generated-schemas//read-cart-items-query.schema'
import { CartItemsEntity } from './entities/cart-item.entity'

@Injectable()
export class CartItemsService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateCartItemsSchemaOutput){
				return await this.service.create(CartItemsEntity, body);
			}

			async updateRow(id: number, body: TUpdateCartItemsSchemaOutput){
				return await this.service.update(CartItemsEntity, id, body);
			}

			async readRows(query: TReadCartItemsSchemaOutput){
				return await this.service.read(CartItemsEntity, query);
			}
		
}
