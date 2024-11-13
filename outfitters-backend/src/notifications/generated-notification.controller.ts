import { Controller, Post, Body } from '@nestjs/common';
import { CreateNotificationEntityDto } from './generated-dtos/create/create-notification-entity.dto'
import { NotificationService } from './generated-notification.service'

@Controller('notification')
export class NotificationController {
  
  constructor(private service: NotificationService){}
  
			@Post()
			async create(@Body() body: CreateNotificationEntityDto){
				return this.service.createRow(body);
			}
		
}
