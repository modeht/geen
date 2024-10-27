import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddSavedCollectionItemEntityDto } from './generated-dtos/add-saved-collection-item-entity.dto'
import { SavedCollectionItemEntity } from './entities/saved-collection-item.entity'

@Injectable()
export class SavedCollectionItemService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddSavedCollectionItemEntityDto){
				return await this.service.create(SavedCollectionItemEntity, AddSavedCollectionItemEntityDto, body);
			}
		
}
