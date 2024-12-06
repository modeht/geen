import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateProductVariantSchema, {
	TCreateProductVariantSchemaInput,
	TCreateProductVariantSchemaOutput,
} from './generated-schemas//create-product-variant.schema';
import UpdateProductVariantSchema, {
	TUpdateProductVariantSchemaInput,
	TUpdateProductVariantSchemaOutput,
} from './generated-schemas//update-product-variant.schema';
import ReadProductVariantSchema, {
	TReadProductVariantSchemaInput,
	TReadProductVariantSchemaOutput,
} from './generated-schemas//read-product-variant-query.schema';
import { ProductVariantEntity } from './entities/product-variant.entity';

@Injectable()
export class ProductVariantService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateProductVariantSchemaOutput) {
		return await this.service.create(ProductVariantEntity, body);
	}

	async updateRow(id: number, body: TUpdateProductVariantSchemaOutput) {
		return await this.service.update(ProductVariantEntity, id, body);
	}

	async readRows(query: TReadProductVariantSchemaOutput) {
		return await this.service.read(ProductVariantEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(ProductVariantEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(ProductVariantEntity, id, { soft: true });
	}
}
