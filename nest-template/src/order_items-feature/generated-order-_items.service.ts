import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
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

@Injectable()
export class Order_itemsService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateOrder_itemsSchemaOutput) {
		return await this.service.create(Order_itemsEntity, body);
	}

	async updateRow(id: number, body: TUpdateOrder_itemsSchemaOutput) {
		return await this.service.update(Order_itemsEntity, id, body);
	}

	async readRows(query: TReadOrder_itemsSchemaOutput) {
		return await this.service.read(Order_itemsEntity, query);
	}

	async readOneRow(id: number, query: TReadOneOrder_itemsSchemaOutput) {
		return await this.service.readOne(Order_itemsEntity, id, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(Order_itemsEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(Order_itemsEntity, id, { soft: true });
	}
}
