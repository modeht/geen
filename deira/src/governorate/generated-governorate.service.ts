import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateGovernorateSchema, {
	TCreateGovernorateSchemaInput,
	TCreateGovernorateSchemaOutput,
} from './generated-schemas//create-governorate.schema';
import UpdateGovernorateSchema, {
	TUpdateGovernorateSchemaInput,
	TUpdateGovernorateSchemaOutput,
} from './generated-schemas//update-governorate.schema';
import ReadGovernorateSchema, {
	TReadGovernorateSchemaInput,
	TReadGovernorateSchemaOutput,
} from './generated-schemas//read-governorate-query.schema';
import { GovernorateEntity } from './entities/governorate.entity';

@Injectable()
export class GovernorateService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateGovernorateSchemaOutput) {
		return await this.service.create(GovernorateEntity, body);
	}

	async updateRow(id: number, body: TUpdateGovernorateSchemaOutput) {
		return await this.service.update(GovernorateEntity, id, body);
	}

	async readRows(query: TReadGovernorateSchemaOutput) {
		return await this.service.read(GovernorateEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(GovernorateEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(GovernorateEntity, id, { soft: true });
	}
}
