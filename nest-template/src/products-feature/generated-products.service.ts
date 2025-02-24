import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateProductsSchema, {
	TCreateProductsSchemaInput,
	TCreateProductsSchemaOutput,
} from './generated-schemas//create-products.schema';
import UpdateProductsSchema, {
	TUpdateProductsSchemaInput,
	TUpdateProductsSchemaOutput,
} from './generated-schemas//update-products.schema';
import ReadProductsSchema, {
	TReadProductsSchemaInput,
	TReadProductsSchemaOutput,
} from './generated-schemas//read-products-query.schema';
import ReadOneProductsSchema, {
	TReadOneProductsSchemaInput,
	TReadOneProductsSchemaOutput,
} from './generated-schemas//read-one-products-query.schema';
import { ProductsEntity } from './entities/products.entity';

@Injectable()
export class ProductsService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateProductsSchemaOutput) {
		return await this.service.create(ProductsEntity, body);
	}

	async updateRow(id: number, body: TUpdateProductsSchemaOutput) {
		return await this.service.update(ProductsEntity, id, body);
	}

	async readRows(query: TReadProductsSchemaOutput) {
		return await this.service.read(ProductsEntity, query);
	}

	async readOneRow(id: number, query: TReadOneProductsSchemaOutput) {
		return await this.service.readOne(ProductsEntity, id, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(ProductsEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(ProductsEntity, id, { soft: true });
	}
}
