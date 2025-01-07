import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateStaticSchema, {
	TCreateStaticSchemaInput,
	TCreateStaticSchemaOutput,
} from './generated-schemas//create-static.schema';
import UpdateStaticSchema, {
	TUpdateStaticSchemaInput,
	TUpdateStaticSchemaOutput,
} from './generated-schemas//update-static.schema';
import ReadStaticSchema, {
	TReadStaticSchemaInput,
	TReadStaticSchemaOutput,
} from './generated-schemas//read-static-query.schema';
import { StaticEntity } from './entities/static.entity';

@Injectable()
export class StaticService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateStaticSchemaOutput) {
		return await this.service.create(StaticEntity, body);
	}

	async updateRow(id: number, body: TUpdateStaticSchemaOutput) {
		return await this.service.update(StaticEntity, id, body);
	}

	async readRows(query: TReadStaticSchemaOutput) {
		return await this.service.read(StaticEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(StaticEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(StaticEntity, id, { soft: true });
	}
}
