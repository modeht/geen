import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateRedeemSchema, {
	TCreateRedeemSchemaInput,
	TCreateRedeemSchemaOutput,
} from './generated-schemas//create-redeem.schema';
import UpdateRedeemSchema, {
	TUpdateRedeemSchemaInput,
	TUpdateRedeemSchemaOutput,
} from './generated-schemas//update-redeem.schema';
import ReadRedeemSchema, {
	TReadRedeemSchemaInput,
	TReadRedeemSchemaOutput,
} from './generated-schemas//read-redeem-query.schema';
import { RedeemEntity } from './entities/redeem.entity';

@Injectable()
export class RedeemService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateRedeemSchemaOutput) {
		return await this.service.create(RedeemEntity, body);
	}

	async updateRow(id: number, body: TUpdateRedeemSchemaOutput) {
		return await this.service.update(RedeemEntity, id, body);
	}

	async readRows(query: TReadRedeemSchemaOutput) {
		return await this.service.read(RedeemEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(RedeemEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(RedeemEntity, id, { soft: true });
	}
}
