import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateCartSchema, { TCreateCartSchemaInput, TCreateCartSchemaOutput } from './generated-schemas//create-cart.schema'
import UpdateCartSchema, { TUpdateCartSchemaInput, TUpdateCartSchemaOutput } from './generated-schemas//update-cart.schema'
import ReadCartSchema, { TReadCartSchemaInput, TReadCartSchemaOutput } from './generated-schemas//read-cart-query.schema'
import { CartEntity } from './entities/cart.entity'

@Injectable()
export class CartService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateCartSchemaOutput){
				return await this.service.create(CartEntity, body);
			}

			async updateRow(id: number, body: TUpdateCartSchemaOutput){
				return await this.service.update(CartEntity, id, body);
			}

			async readRows(query: TReadCartSchemaOutput){
				return await this.service.read(CartEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(CartEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(CartEntity, id, { soft: true });
			}
		
}
