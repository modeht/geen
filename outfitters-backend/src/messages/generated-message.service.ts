import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateMessageEntityDto } from './generated-dtos/create/create-message-entity.dto'
import { MessageEntity } from './entities/message.entity'

@Injectable()
export class MessageService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateMessageEntityDto){
				return await this.service.create(MessageEntity, CreateMessageEntityDto, body);
			}
		
}
