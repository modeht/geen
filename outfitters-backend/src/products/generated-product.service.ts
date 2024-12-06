import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateProductSchema, {
	TCreateProductSchemaInput,
	TCreateProductSchemaOutput,
} from './generated-schemas//create-product.schema';
import UpdateProductSchema, {
	TUpdateProductSchemaInput,
	TUpdateProductSchemaOutput,
} from './generated-schemas//update-product.schema';
import ReadProductSchema, {
	TReadProductSchemaInput,
	TReadProductSchemaOutput,
} from './generated-schemas//read-product-query.schema';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateProductSchemaOutput) {
		return await this.service.create(ProductEntity, body);
	}

	async updateRow(id: number, body: TUpdateProductSchemaOutput) {
		return await this.service.update(ProductEntity, id, body);
	}

	async readRows(query: TReadProductSchemaOutput) {
		return await this.service.read(ProductEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(ProductEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(ProductEntity, id, { soft: true });
	}
}
