import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateCountrySchema, {
	TCreateCountrySchemaInput,
	TCreateCountrySchemaOutput,
} from './generated-schemas//create-country.schema';
import UpdateCountrySchema, {
	TUpdateCountrySchemaInput,
	TUpdateCountrySchemaOutput,
} from './generated-schemas//update-country.schema';
import ReadCountrySchema, {
	TReadCountrySchemaInput,
	TReadCountrySchemaOutput,
} from './generated-schemas//read-country-query.schema';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateCountrySchemaOutput) {
		return await this.service.create(CountryEntity, body);
	}

	async updateRow(id: number, body: TUpdateCountrySchemaOutput) {
		return await this.service.update(CountryEntity, id, body);
	}

	async readRows(query: TReadCountrySchemaOutput) {
		return await this.service.read(CountryEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(CountryEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(CountryEntity, id, { soft: true });
	}
}
