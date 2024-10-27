import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddSavedCollectionEntityDto } from './generated-dtos/add-saved-collection-entity.dto'
import { SavedCollectionEntity } from './entities/saved-collection.entity'

@Injectable()
export class SavedCollectionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddSavedCollectionEntityDto){
				return await this.service.create(SavedCollectionEntity, AddSavedCollectionEntityDto, body);
			}
		
}
