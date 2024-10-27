import { Controller, Post, Body } from '@nestjs/common';
import { AddConversationEntityDto } from './generated-dtos/add-conversation-entity.dto'
import { ConversationService } from './generated-conversation.service'

@Controller('conversation')
export class ConversationController {
  
  constructor(private service: ConversationService){}
  
			@Post()
			async create(@Body() body: AddConversationEntityDto){
				return this.service.createRow(body);
			}
		
}
