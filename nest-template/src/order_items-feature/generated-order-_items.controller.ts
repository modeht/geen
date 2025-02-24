import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateOrder_itemsSchema, {
	TCreateOrder_itemsSchemaInput,
	TCreateOrder_itemsSchemaOutput,
} from './generated-schemas//create-order-_items.schema';
import UpdateOrder_itemsSchema, {
	TUpdateOrder_itemsSchemaInput,
	TUpdateOrder_itemsSchemaOutput,
} from './generated-schemas//update-order-_items.schema';
import ReadOrder_itemsSchema, {
	TReadOrder_itemsSchemaInput,
	TReadOrder_itemsSchemaOutput,
} from './generated-schemas//read-order-_items-query.schema';
import ReadOneOrder_itemsSchema, {
	TReadOneOrder_itemsSchemaInput,
	TReadOneOrder_itemsSchemaOutput,
} from './generated-schemas//read-one-order-_items-query.schema';
import { Order_itemsEntity } from './entities/order_items.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { Order_itemsService } from './generated-order-_items.service';

@Controller('order-_items')
export class Order_itemsController {
	constructor(private service: Order_itemsService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateOrder_items,
		},
	})
	async create(@MoBody(CreateOrder_itemsSchema) body: TCreateOrder_itemsSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateOrder_items,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateOrder_itemsSchema) body: TUpdateOrder_itemsSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadOrder_itemsQuery,
		},
	})
	async read(@MoQuery(ReadOrder_itemsSchema) query: TReadOrder_itemsSchemaOutput) {
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
			$ref: SchemaDefs.ReadOneOrder_itemsQuery,
		},
	})
	async readOne(@Param('id') id: string, @MoQuery(ReadOneOrder_itemsSchema) query: TReadOneOrder_itemsSchemaOutput) {
		return this.service.readOneRow(+id, query);
	}
}
