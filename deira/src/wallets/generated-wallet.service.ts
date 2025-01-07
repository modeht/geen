import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateWalletSchema, {
	TCreateWalletSchemaInput,
	TCreateWalletSchemaOutput,
} from './generated-schemas//create-wallet.schema';
import UpdateWalletSchema, {
	TUpdateWalletSchemaInput,
	TUpdateWalletSchemaOutput,
} from './generated-schemas//update-wallet.schema';
import ReadWalletSchema, {
	TReadWalletSchemaInput,
	TReadWalletSchemaOutput,
} from './generated-schemas//read-wallet-query.schema';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateWalletSchemaOutput) {
		return await this.service.create(WalletEntity, body);
	}

	async updateRow(id: number, body: TUpdateWalletSchemaOutput) {
		return await this.service.update(WalletEntity, id, body);
	}

	async readRows(query: TReadWalletSchemaOutput) {
		return await this.service.read(WalletEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(WalletEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(WalletEntity, id, { soft: true });
	}
}
