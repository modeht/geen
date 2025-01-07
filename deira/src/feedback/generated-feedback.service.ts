import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateFeedbackSchema, {
	TCreateFeedbackSchemaInput,
	TCreateFeedbackSchemaOutput,
} from './generated-schemas//create-feedback.schema';
import UpdateFeedbackSchema, {
	TUpdateFeedbackSchemaInput,
	TUpdateFeedbackSchemaOutput,
} from './generated-schemas//update-feedback.schema';
import ReadFeedbackSchema, {
	TReadFeedbackSchemaInput,
	TReadFeedbackSchemaOutput,
} from './generated-schemas//read-feedback-query.schema';
import { FeedbackEntity } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateFeedbackSchemaOutput) {
		return await this.service.create(FeedbackEntity, body);
	}

	async updateRow(id: number, body: TUpdateFeedbackSchemaOutput) {
		return await this.service.update(FeedbackEntity, id, body);
	}

	async readRows(query: TReadFeedbackSchemaOutput) {
		return await this.service.read(FeedbackEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(FeedbackEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(FeedbackEntity, id, { soft: true });
	}
}
