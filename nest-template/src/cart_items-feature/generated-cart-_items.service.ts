import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateCart_itemsSchema, {
	TCreateCart_itemsSchemaInput,
	TCreateCart_itemsSchemaOutput,
} from './generated-schemas//create-cart-_items.schema';
import UpdateCart_itemsSchema, {
	TUpdateCart_itemsSchemaInput,
	TUpdateCart_itemsSchemaOutput,
} from './generated-schemas//update-cart-_items.schema';
import ReadCart_itemsSchema, {
	TReadCart_itemsSchemaInput,
	TReadCart_itemsSchemaOutput,
} from './generated-schemas//read-cart-_items-query.schema';
import ReadOneCart_itemsSchema, {
	TReadOneCart_itemsSchemaInput,
	TReadOneCart_itemsSchemaOutput,
} from './generated-schemas//read-one-cart-_items-query.schema';
import { Cart_itemsEntity } from './entities/cart_items.entity';

@Injectable()
export class Cart_itemsService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateCart_itemsSchemaOutput) {
		return await this.service.create(Cart_itemsEntity, body);
	}

	async updateRow(id: number, body: TUpdateCart_itemsSchemaOutput) {
		return await this.service.update(Cart_itemsEntity, id, body);
	}

	async readRows(query: TReadCart_itemsSchemaOutput) {
		return await this.service.read(Cart_itemsEntity, query);
	}

	async readOneRow(id: number, query: TReadOneCart_itemsSchemaOutput) {
		return await this.service.readOne(Cart_itemsEntity, id, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(Cart_itemsEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(Cart_itemsEntity, id, { soft: true });
	}
}
