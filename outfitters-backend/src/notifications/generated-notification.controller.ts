import { Controller, Post, Get, Put, Param } from '@nestjs/common';
import CreateNotificationSchema, { TCreateNotificationSchemaInput, TCreateNotificationSchemaOutput } from './generated-schemas//create-notification.schema'
import UpdateNotificationSchema, { TUpdateNotificationSchemaInput, TUpdateNotificationSchemaOutput } from './generated-schemas//update-notification.schema'
import ReadNotificationSchema, { TReadNotificationSchemaInput, TReadNotificationSchemaOutput } from './generated-schemas//read-notification-query.schema'
import { NotificationEntity } from './entities/notification.entity'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { SchemaDefs } from "../schema-defs"
import { MoBody } from "../globals/decorators/mo-body.decorator"
import { MoQuery } from "../globals/decorators/mo-query.decorator"
import { NotificationService } from './generated-notification.service'

@Controller('notification')
export class NotificationController {
  
  constructor(private service: NotificationService){}
  
			@Post()
			@ApiBody({
				schema:{
					$ref: SchemaDefs.CreateNotification
				}
			})
			async create(
				@MoBody(CreateNotificationSchema) body: TCreateNotificationSchemaOutput,
			) {
				return this.service.createRow(body);
			}
		

			@Put(':id')
			@ApiBody({
				schema:{
					$ref: SchemaDefs.UpdateNotification
				}
			})
			async update(
				@Param('id') id: string,
				@MoBody(UpdateNotificationSchema) body: TUpdateNotificationSchemaOutput,
			) {
				return this.service.updateRow(+id, body);
			}
		

			@Get()
			@ApiQuery({
				schema:{
					$ref: SchemaDefs.ReadNotificationQuery
				}
			})
			async read(
				@MoQuery(ReadNotificationSchema) query: TReadNotificationSchemaOutput,
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
			async delete(
				@Param('id') id: string,
			) {
				return this.service.softDeleteRow(+id);
			}
		
}
