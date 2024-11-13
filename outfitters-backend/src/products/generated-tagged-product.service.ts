import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateTaggedProductEntityDto } from './generated-dtos/create/create-tagged-product-entity.dto'
import { TaggedProductEntity } from './entities/tagged-product.entity'

@Injectable()
export class TaggedProductService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateTaggedProductEntityDto){
				return await this.service.create(TaggedProductEntity, CreateTaggedProductEntityDto, body);
			}
		
}
