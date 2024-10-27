import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddConversationEntityDto } from './generated-dtos/add-conversation-entity.dto'
import { ConversationEntity } from './entities/conversation.entity'

@Injectable()
export class ConversationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddConversationEntityDto){
				return await this.service.create(ConversationEntity, AddConversationEntityDto, body);
			}
		
}
