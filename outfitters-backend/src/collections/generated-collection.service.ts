import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddCollectionEntityDto } from './generated-dtos/add-collection-entity.dto'
import { CollectionEntity } from './entities/collection.entity'

@Injectable()
export class CollectionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddCollectionEntityDto){
				return await this.service.create(CollectionEntity, AddCollectionEntityDto, body);
			}
		
}
