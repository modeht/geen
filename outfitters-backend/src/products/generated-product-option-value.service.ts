import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateProductOptionValueSchema, {
	TCreateProductOptionValueSchemaInput,
	TCreateProductOptionValueSchemaOutput,
} from './generated-schemas//create-product-option-value.schema';
import UpdateProductOptionValueSchema, {
	TUpdateProductOptionValueSchemaInput,
	TUpdateProductOptionValueSchemaOutput,
} from './generated-schemas//update-product-option-value.schema';
import ReadProductOptionValueSchema, {
	TReadProductOptionValueSchemaInput,
	TReadProductOptionValueSchemaOutput,
} from './generated-schemas//read-product-option-value-query.schema';
import { ProductOptionValueEntity } from './entities/product-option-value.entity';

@Injectable()
export class ProductOptionValueService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateProductOptionValueSchemaOutput) {
		return await this.service.create(ProductOptionValueEntity, body);
	}

	async updateRow(id: number, body: TUpdateProductOptionValueSchemaOutput) {
		return await this.service.update(ProductOptionValueEntity, id, body);
	}

	async readRows(query: TReadProductOptionValueSchemaOutput) {
		return await this.service.read(ProductOptionValueEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(ProductOptionValueEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(ProductOptionValueEntity, id, { soft: true });
	}
}
