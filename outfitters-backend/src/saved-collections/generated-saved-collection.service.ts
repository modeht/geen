import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateSavedCollectionEntityDto } from './generated-dtos/create/create-saved-collection-entity.dto'
import { SavedCollectionEntity } from './entities/saved-collection.entity'

@Injectable()
export class SavedCollectionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateSavedCollectionEntityDto){
				return await this.service.create(SavedCollectionEntity, CreateSavedCollectionEntityDto, body);
			}
		
}
