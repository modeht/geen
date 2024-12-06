import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateStorySchema, {
	TCreateStorySchemaInput,
	TCreateStorySchemaOutput,
} from './generated-schemas//create-story.schema';
import UpdateStorySchema, {
	TUpdateStorySchemaInput,
	TUpdateStorySchemaOutput,
} from './generated-schemas//update-story.schema';
import ReadStorySchema, {
	TReadStorySchemaInput,
	TReadStorySchemaOutput,
} from './generated-schemas//read-story-query.schema';
import { StoryEntity } from './entities/story.entity';

@Injectable()
export class StoryService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateStorySchemaOutput) {
		return await this.service.create(StoryEntity, body);
	}

	async updateRow(id: number, body: TUpdateStorySchemaOutput) {
		return await this.service.update(StoryEntity, id, body);
	}

	async readRows(query: TReadStorySchemaOutput) {
		return await this.service.read(StoryEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(StoryEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(StoryEntity, id, { soft: true });
	}
}
