import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateRecentSearchesSchema, {
	TCreateRecentSearchesSchemaInput,
	TCreateRecentSearchesSchemaOutput,
} from './generated-schemas//create-recent-searches.schema';
import UpdateRecentSearchesSchema, {
	TUpdateRecentSearchesSchemaInput,
	TUpdateRecentSearchesSchemaOutput,
} from './generated-schemas//update-recent-searches.schema';
import ReadRecentSearchesSchema, {
	TReadRecentSearchesSchemaInput,
	TReadRecentSearchesSchemaOutput,
} from './generated-schemas//read-recent-searches-query.schema';
import { RecentSearchesEntity } from './entities/recent-searches.entity';

@Injectable()
export class RecentSearchesService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateRecentSearchesSchemaOutput) {
		return await this.service.create(RecentSearchesEntity, body);
	}

	async updateRow(id: number, body: TUpdateRecentSearchesSchemaOutput) {
		return await this.service.update(RecentSearchesEntity, id, body);
	}

	async readRows(query: TReadRecentSearchesSchemaOutput) {
		return await this.service.read(RecentSearchesEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(RecentSearchesEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(RecentSearchesEntity, id, { soft: true });
	}
}
