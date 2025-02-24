import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
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

@Injectable()
export class OrdersService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateOrdersSchemaOutput) {
		return await this.service.create(OrdersEntity, body);
	}

	async updateRow(id: number, body: TUpdateOrdersSchemaOutput) {
		return await this.service.update(OrdersEntity, id, body);
	}

	async readRows(query: TReadOrdersSchemaOutput) {
		return await this.service.read(OrdersEntity, query);
	}

	async readOneRow(id: number, query: TReadOneOrdersSchemaOutput) {
		return await this.service.readOne(OrdersEntity, id, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(OrdersEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(OrdersEntity, id, { soft: true });
	}
}
