import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddMessageEntityDto } from './generated-dtos/create/create-message-entity.dto'
import { MessageEntity } from './entities/message.entity'

@Injectable()
export class MessageService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddMessageEntityDto){
				return await this.service.create(MessageEntity, AddMessageEntityDto, body);
			}
		
}
