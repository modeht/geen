import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateAdSchema, { TCreateAdSchemaInput, TCreateAdSchemaOutput } from './generated-schemas//create-ad.schema';
import UpdateAdSchema, { TUpdateAdSchemaInput, TUpdateAdSchemaOutput } from './generated-schemas//update-ad.schema';
import ReadAdSchema, { TReadAdSchemaInput, TReadAdSchemaOutput } from './generated-schemas//read-ad-query.schema';
import { AdEntity } from './entities/ad.entity';

@Injectable()
export class AdService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateAdSchemaOutput) {
		return await this.service.create(AdEntity, body);
	}

	async updateRow(id: number, body: TUpdateAdSchemaOutput) {
		return await this.service.update(AdEntity, id, body);
	}

	async readRows(query: TReadAdSchemaOutput) {
		return await this.service.read(AdEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(AdEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(AdEntity, id, { soft: true });
	}
}
