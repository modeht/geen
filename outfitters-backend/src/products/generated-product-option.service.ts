import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddProductOptionEntityDto } from './generated-dtos/create/create-product-option-entity.dto'
import { ProductOptionEntity } from './entities/product-option.entity'

@Injectable()
export class ProductOptionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddProductOptionEntityDto){
				return await this.service.create(ProductOptionEntity, AddProductOptionEntityDto, body);
			}
		
}
