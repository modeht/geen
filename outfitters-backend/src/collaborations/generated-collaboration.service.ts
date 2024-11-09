import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddCollaborationEntityDto } from './generated-dtos/create/create-collaboration-entity.dto'
import { CollaborationEntity } from './entities/collaboration.entity'

@Injectable()
export class CollaborationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddCollaborationEntityDto){
				return await this.service.create(CollaborationEntity, AddCollaborationEntityDto, body);
			}
		
}
