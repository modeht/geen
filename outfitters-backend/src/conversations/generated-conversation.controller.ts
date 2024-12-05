import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateConversationSchema, { TCreateConversationSchemaInput, TCreateConversationSchemaOutput } from './generated-schemas//create-conversation.schema'
import UpdateConversationSchema, { TUpdateConversationSchemaInput, TUpdateConversationSchemaOutput } from './generated-schemas//update-conversation.schema'
import ReadConversationSchema, { TReadConversationSchemaInput, TReadConversationSchemaOutput } from './generated-schemas//read-conversation-query.schema'
import { ConversationEntity } from './entities/conversation.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { ConversationService } from './generated-conversation.service'

@Controller('conversation')
export class ConversationController {
  
  constructor(private service: ConversationService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateConversation
				}
			})
			async create(
				@MoBody(CreateConversationSchema) body: TCreateConversationSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateConversation
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateConversationSchema) body: TUpdateConversationSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadConversationQuery
				}
			})
			async read(
				@MoQuery(ReadConversationSchema) query: TReadConversationSchemaOutput,
			) {
				return this.service.readRows(query);
			}
		

			@Delete(':id')
			async delete(
				@Param('id') id: string,
			) {
				return this.service.deleteRow(+id);
			}
		

			@Delete(':id/soft')
			async softDelete(
				@Param('id') id: string,
			) {
				return this.service.softDeleteRow(+id);
			}
		
}
