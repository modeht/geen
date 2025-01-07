import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateNotificationSchema, {
	TCreateNotificationSchemaInput,
	TCreateNotificationSchemaOutput,
} from './generated-schemas//create-notification.schema';
import UpdateNotificationSchema, {
	TUpdateNotificationSchemaInput,
	TUpdateNotificationSchemaOutput,
} from './generated-schemas//update-notification.schema';
import ReadNotificationSchema, {
	TReadNotificationSchemaInput,
	TReadNotificationSchemaOutput,
} from './generated-schemas//read-notification-query.schema';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateNotificationSchemaOutput) {
		return await this.service.create(NotificationEntity, body);
	}

	async updateRow(id: number, body: TUpdateNotificationSchemaOutput) {
		return await this.service.update(NotificationEntity, id, body);
	}

	async readRows(query: TReadNotificationSchemaOutput) {
		return await this.service.read(NotificationEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(NotificationEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(NotificationEntity, id, { soft: true });
	}
}
