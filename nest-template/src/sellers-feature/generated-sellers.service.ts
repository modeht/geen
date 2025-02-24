import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateSellersSchema, {
	TCreateSellersSchemaInput,
	TCreateSellersSchemaOutput,
} from './generated-schemas//create-sellers.schema';
import UpdateSellersSchema, {
	TUpdateSellersSchemaInput,
	TUpdateSellersSchemaOutput,
} from './generated-schemas//update-sellers.schema';
import ReadSellersSchema, {
	TReadSellersSchemaInput,
	TReadSellersSchemaOutput,
} from './generated-schemas//read-sellers-query.schema';
import ReadOneSellersSchema, {
	TReadOneSellersSchemaInput,
	TReadOneSellersSchemaOutput,
} from './generated-schemas//read-one-sellers-query.schema';
import { SellersEntity } from './entities/sellers.entity';

@Injectable()
export class SellersService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateSellersSchemaOutput) {
		return await this.service.create(SellersEntity, body);
	}

	async updateRow(id: number, body: TUpdateSellersSchemaOutput) {
		return await this.service.update(SellersEntity, id, body);
	}

	async readRows(query: TReadSellersSchemaOutput) {
		return await this.service.read(SellersEntity, query);
	}

	async readOneRow(id: number, query: TReadOneSellersSchemaOutput) {
		return await this.service.readOne(SellersEntity, id, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(SellersEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(SellersEntity, id, { soft: true });
	}
}
