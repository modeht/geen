import { Controller, Post, Body } from '@nestjs/common';
import { AddMessageEntityDto } from './generated-dtos/add-message-entity.dto'
import { MessageService } from './generated-message.service'

@Controller('message')
export class MessageController {
  
  constructor(private service: MessageService){}
  
			@Post()
			async create(@Body() body: AddMessageEntityDto){
				return this.service.createRow(body);
			}
		
}
