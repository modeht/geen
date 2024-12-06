import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreatePreferenceSchema, {
	TCreatePreferenceSchemaInput,
	TCreatePreferenceSchemaOutput,
} from './generated-schemas//create-preference.schema';
import UpdatePreferenceSchema, {
	TUpdatePreferenceSchemaInput,
	TUpdatePreferenceSchemaOutput,
} from './generated-schemas//update-preference.schema';
import ReadPreferenceSchema, {
	TReadPreferenceSchemaInput,
	TReadPreferenceSchemaOutput,
} from './generated-schemas//read-preference-query.schema';
import { PreferenceEntity } from './entities/preference.entity';

@Injectable()
export class PreferenceService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreatePreferenceSchemaOutput) {
		return await this.service.create(PreferenceEntity, body);
	}

	async updateRow(id: number, body: TUpdatePreferenceSchemaOutput) {
		return await this.service.update(PreferenceEntity, id, body);
	}

	async readRows(query: TReadPreferenceSchemaOutput) {
		return await this.service.read(PreferenceEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(PreferenceEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(PreferenceEntity, id, { soft: true });
	}
}
