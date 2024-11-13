import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateProductEntityDto } from './generated-dtos/create/create-product-entity.dto'
import { ProductEntity } from './entities/product.entity'

@Injectable()
export class ProductService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateProductEntityDto){
				return await this.service.create(ProductEntity, CreateProductEntityDto, body);
			}
		
}
