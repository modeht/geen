import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { SellersService } from './generated-sellers.service';

@Controller('sellers')
export class SellersController {
	constructor(private service: SellersService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateSellers,
		},
	})
	async create(@MoBody(CreateSellersSchema) body: TCreateSellersSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateSellers,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateSellersSchema) body: TUpdateSellersSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadSellersQuery,
		},
	})
	async read(@MoQuery(ReadSellersSchema) query: TReadSellersSchemaOutput) {
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

	@Get(':id')
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadOneSellersQuery,
		},
	})
	async readOne(@Param('id') id: string, @MoQuery(ReadOneSellersSchema) query: TReadOneSellersSchemaOutput) {
		return this.service.readOneRow(+id, query);
	}
}
