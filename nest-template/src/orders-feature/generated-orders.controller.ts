import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateOrdersSchema, {
	TCreateOrdersSchemaInput,
	TCreateOrdersSchemaOutput,
} from './generated-schemas//create-orders.schema';
import UpdateOrdersSchema, {
	TUpdateOrdersSchemaInput,
	TUpdateOrdersSchemaOutput,
} from './generated-schemas//update-orders.schema';
import ReadOrdersSchema, {
	TReadOrdersSchemaInput,
	TReadOrdersSchemaOutput,
} from './generated-schemas//read-orders-query.schema';
import ReadOneOrdersSchema, {
	TReadOneOrdersSchemaInput,
	TReadOneOrdersSchemaOutput,
} from './generated-schemas//read-one-orders-query.schema';
import { OrdersEntity } from './entities/orders.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { OrdersService } from './generated-orders.service';

@Controller('orders')
export class OrdersController {
	constructor(private service: OrdersService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateOrders,
		},
	})
	async create(@MoBody(CreateOrdersSchema) body: TCreateOrdersSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateOrders,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateOrdersSchema) body: TUpdateOrdersSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadOrdersQuery,
		},
	})
	async read(@MoQuery(ReadOrdersSchema) query: TReadOrdersSchemaOutput) {
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
			$ref: SchemaDefs.ReadOneOrdersQuery,
		},
	})
	async readOne(@Param('id') id: string, @MoQuery(ReadOneOrdersSchema) query: TReadOneOrdersSchemaOutput) {
		return this.service.readOneRow(+id, query);
	}
}
