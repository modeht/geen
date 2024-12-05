import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateMessageSchema, { TCreateMessageSchemaInput, TCreateMessageSchemaOutput } from './generated-schemas//create-message.schema'
import UpdateMessageSchema, { TUpdateMessageSchemaInput, TUpdateMessageSchemaOutput } from './generated-schemas//update-message.schema'
import ReadMessageSchema, { TReadMessageSchemaInput, TReadMessageSchemaOutput } from './generated-schemas//read-message-query.schema'
import { MessageEntity } from './entities/message.entity'

@Injectable()
export class MessageService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateMessageSchemaOutput){
				return await this.service.create(MessageEntity, body);
			}

			async updateRow(id: number, body: TUpdateMessageSchemaOutput){
				return await this.service.update(MessageEntity, id, body);
			}

			async readRows(query: TReadMessageSchemaOutput){
				return await this.service.read(MessageEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(MessageEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(MessageEntity, id, { soft: true });
			}
		
}
