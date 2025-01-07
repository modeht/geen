import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { RedeemService } from './generated-redeem.service';

@Controller('redeem')
export class RedeemController {
	constructor(private service: RedeemService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateRedeem,
		},
	})
	async create(@MoBody(CreateRedeemSchema) body: TCreateRedeemSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateRedeem,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateRedeemSchema) body: TUpdateRedeemSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadRedeemQuery,
		},
	})
	async read(@MoQuery(ReadRedeemSchema) query: TReadRedeemSchemaOutput) {
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
