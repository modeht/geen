import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateProductOptionEntityDto } from './generated-dtos/create/create-product-option-entity.dto'
import { ProductOptionEntity } from './entities/product-option.entity'

@Injectable()
export class ProductOptionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateProductOptionEntityDto){
				return await this.service.create(ProductOptionEntity, CreateProductOptionEntityDto, body);
			}
		
}
