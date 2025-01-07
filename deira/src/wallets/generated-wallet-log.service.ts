import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateWalletLogSchema, {
	TCreateWalletLogSchemaInput,
	TCreateWalletLogSchemaOutput,
} from './generated-schemas//create-wallet-log.schema';
import UpdateWalletLogSchema, {
	TUpdateWalletLogSchemaInput,
	TUpdateWalletLogSchemaOutput,
} from './generated-schemas//update-wallet-log.schema';
import ReadWalletLogSchema, {
	TReadWalletLogSchemaInput,
	TReadWalletLogSchemaOutput,
} from './generated-schemas//read-wallet-log-query.schema';
import { WalletLogEntity } from './entities/wallet-log.entity';

@Injectable()
export class WalletLogService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateWalletLogSchemaOutput) {
		return await this.service.create(WalletLogEntity, body);
	}

	async updateRow(id: number, body: TUpdateWalletLogSchemaOutput) {
		return await this.service.update(WalletLogEntity, id, body);
	}

	async readRows(query: TReadWalletLogSchemaOutput) {
		return await this.service.read(WalletLogEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(WalletLogEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(WalletLogEntity, id, { soft: true });
	}
}
