import { Controller, Post, Body } from '@nestjs/common';
import { AddNotificationEntityDto } from './generated-dtos/add-notification-entity.dto'
import { NotificationService } from './generated-notification.service'

@Controller('notification')
export class NotificationController {
  
  constructor(private service: NotificationService){}
  
			@Post()
			async create(@Body() body: AddNotificationEntityDto){
				return this.service.createRow(body);
			}
		
}
