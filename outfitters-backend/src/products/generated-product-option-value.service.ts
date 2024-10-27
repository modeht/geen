import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddProductOptionValueEntityDto } from './generated-dtos/add-product-option-value-entity.dto'
import { ProductOptionValueEntity } from './entities/product-option-value.entity'

@Injectable()
export class ProductOptionValueService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddProductOptionValueEntityDto){
				return await this.service.create(ProductOptionValueEntity, AddProductOptionValueEntityDto, body);
			}
		
}
