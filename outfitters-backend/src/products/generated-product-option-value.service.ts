import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateProductOptionValueEntityDto } from './generated-dtos/create/create-product-option-value-entity.dto'
import { ProductOptionValueEntity } from './entities/product-option-value.entity'

@Injectable()
export class ProductOptionValueService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateProductOptionValueEntityDto){
				return await this.service.create(ProductOptionValueEntity, CreateProductOptionValueEntityDto, body);
			}
		
}
