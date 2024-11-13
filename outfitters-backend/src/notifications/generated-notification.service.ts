import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateNotificationEntityDto } from './generated-dtos/create/create-notification-entity.dto'
import { NotificationEntity } from './entities/notification.entity'

@Injectable()
export class NotificationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateNotificationEntityDto){
				return await this.service.create(NotificationEntity, CreateNotificationEntityDto, body);
			}
		
}
