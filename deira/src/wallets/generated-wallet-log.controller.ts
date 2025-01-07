import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { WalletLogService } from './generated-wallet-log.service';

@Controller('wallet-log')
export class WalletLogController {
	constructor(private service: WalletLogService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateWalletLog,
		},
	})
	async create(@MoBody(CreateWalletLogSchema) body: TCreateWalletLogSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateWalletLog,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateWalletLogSchema) body: TUpdateWalletLogSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadWalletLogQuery,
		},
	})
	async read(@MoQuery(ReadWalletLogSchema) query: TReadWalletLogSchemaOutput) {
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
