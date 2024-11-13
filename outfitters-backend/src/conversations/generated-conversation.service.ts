import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateConversationEntityDto } from './generated-dtos/create/create-conversation-entity.dto'
import { ConversationEntity } from './entities/conversation.entity'

@Injectable()
export class ConversationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateConversationEntityDto){
				return await this.service.create(ConversationEntity, CreateConversationEntityDto, body);
			}
		
}
