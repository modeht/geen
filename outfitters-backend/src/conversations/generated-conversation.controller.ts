import { Controller, Post, Body } from '@nestjs/common';
import { CreateConversationEntityDto } from './generated-dtos/create/create-conversation-entity.dto'
import { ConversationService } from './generated-conversation.service'

@Controller('conversation')
export class ConversationController {
  
  constructor(private service: ConversationService){}
  
			@Post()
			async create(@Body() body: CreateConversationEntityDto){
				return this.service.createRow(body);
			}
		
}
