import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateSavedCollectionSchema, { TCreateSavedCollectionSchemaInput, TCreateSavedCollectionSchemaOutput } from './generated-schemas//create-saved-collection.schema'
import UpdateSavedCollectionSchema, { TUpdateSavedCollectionSchemaInput, TUpdateSavedCollectionSchemaOutput } from './generated-schemas//update-saved-collection.schema'
import ReadSavedCollectionSchema, { TReadSavedCollectionSchemaInput, TReadSavedCollectionSchemaOutput } from './generated-schemas//read-saved-collection-query.schema'
import { SavedCollectionEntity } from './entities/saved-collection.entity'

@Injectable()
export class SavedCollectionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateSavedCollectionSchemaOutput){
				return await this.service.create(SavedCollectionEntity, body);
			}

			async updateRow(id: number, body: TUpdateSavedCollectionSchemaOutput){
				return await this.service.update(SavedCollectionEntity, id, body);
			}

			async readRows(query: TReadSavedCollectionSchemaOutput){
				return await this.service.read(SavedCollectionEntity, query);
			}
		
}
