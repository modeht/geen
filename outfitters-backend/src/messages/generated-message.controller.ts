import { Controller, Post, Body } from '@nestjs/common';
import { CreateMessageEntityDto } from './generated-dtos/create/create-message-entity.dto'
import { MessageService } from './generated-message.service'

@Controller('message')
export class MessageController {
  
  constructor(private service: MessageService){}
  
			@Post()
			async create(@Body() body: CreateMessageEntityDto){
				return this.service.createRow(body);
			}
		
}
