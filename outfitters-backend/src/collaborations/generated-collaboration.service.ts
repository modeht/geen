import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateCollaborationSchema, { TCreateCollaborationSchemaInput, TCreateCollaborationSchemaOutput } from './generated-schemas//create-collaboration.schema'
import UpdateCollaborationSchema, { TUpdateCollaborationSchemaInput, TUpdateCollaborationSchemaOutput } from './generated-schemas//update-collaboration.schema'
import ReadCollaborationSchema, { TReadCollaborationSchemaInput, TReadCollaborationSchemaOutput } from './generated-schemas//read-collaboration-query.schema'
import { CollaborationEntity } from './entities/collaboration.entity'

@Injectable()
export class CollaborationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateCollaborationSchemaOutput){
				return await this.service.create(CollaborationEntity, body);
			}

			async updateRow(id: number, body: TUpdateCollaborationSchemaOutput){
				return await this.service.update(CollaborationEntity, id, body);
			}

			async readRows(query: TReadCollaborationSchemaOutput){
				return await this.service.read(CollaborationEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(CollaborationEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(CollaborationEntity, id, { soft: true });
			}
		
}
