import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddProductEntityDto } from './generated-dtos/add-product-entity.dto'
import { ProductEntity } from './entities/product.entity'

@Injectable()
export class ProductService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddProductEntityDto){
				return await this.service.create(ProductEntity, AddProductEntityDto, body);
			}
		
}
