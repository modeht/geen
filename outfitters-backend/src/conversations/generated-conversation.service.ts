import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateConversationSchema, { TCreateConversationSchemaInput, TCreateConversationSchemaOutput } from './generated-schemas//create-conversation.schema'
import UpdateConversationSchema, { TUpdateConversationSchemaInput, TUpdateConversationSchemaOutput } from './generated-schemas//update-conversation.schema'
import ReadConversationSchema, { TReadConversationSchemaInput, TReadConversationSchemaOutput } from './generated-schemas//read-conversation-query.schema'
import { ConversationEntity } from './entities/conversation.entity'

@Injectable()
export class ConversationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateConversationSchemaOutput){
				return await this.service.create(ConversationEntity, body);
			}

			async updateRow(id: number, body: TUpdateConversationSchemaOutput){
				return await this.service.update(ConversationEntity, id, body);
			}

			async readRows(query: TReadConversationSchemaOutput){
				return await this.service.read(ConversationEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(ConversationEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(ConversationEntity, id, { soft: true });
			}
		
}
