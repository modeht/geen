import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddTaggedProductEntityDto } from './generated-dtos/add-tagged-product-entity.dto'
import { TaggedProductEntity } from './entities/tagged-product.entity'

@Injectable()
export class TaggedProductService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddTaggedProductEntityDto){
				return await this.service.create(TaggedProductEntity, AddTaggedProductEntityDto, body);
			}
		
}
