import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { WalletService } from './generated-wallet.service';

@Controller('wallet')
export class WalletController {
	constructor(private service: WalletService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateWallet,
		},
	})
	async create(@MoBody(CreateWalletSchema) body: TCreateWalletSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateWallet,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateWalletSchema) body: TUpdateWalletSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadWalletQuery,
		},
	})
	async read(@MoQuery(ReadWalletSchema) query: TReadWalletSchemaOutput) {
		return this.service.readRows(query);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.service.deleteRow(+id);
	}

	@Delete(':id/soft')
	async softDelete(@Param('id') id: string) {
		return this.service.softDeleteRow(+id);
	}
}
