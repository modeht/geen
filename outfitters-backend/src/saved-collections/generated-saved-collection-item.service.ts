import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateSavedCollectionItemEntityDto } from './generated-dtos/create/create-saved-collection-item-entity.dto'
import { SavedCollectionItemEntity } from './entities/saved-collection-item.entity'

@Injectable()
export class SavedCollectionItemService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateSavedCollectionItemEntityDto){
				return await this.service.create(SavedCollectionItemEntity, CreateSavedCollectionItemEntityDto, body);
			}
		
}
