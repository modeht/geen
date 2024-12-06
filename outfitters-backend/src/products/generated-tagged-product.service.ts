import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateTaggedProductSchema, {
	TCreateTaggedProductSchemaInput,
	TCreateTaggedProductSchemaOutput,
} from './generated-schemas//create-tagged-product.schema';
import UpdateTaggedProductSchema, {
	TUpdateTaggedProductSchemaInput,
	TUpdateTaggedProductSchemaOutput,
} from './generated-schemas//update-tagged-product.schema';
import ReadTaggedProductSchema, {
	TReadTaggedProductSchemaInput,
	TReadTaggedProductSchemaOutput,
} from './generated-schemas//read-tagged-product-query.schema';
import { TaggedProductEntity } from './entities/tagged-product.entity';

@Injectable()
export class TaggedProductService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateTaggedProductSchemaOutput) {
		return await this.service.create(TaggedProductEntity, body);
	}

	async updateRow(id: number, body: TUpdateTaggedProductSchemaOutput) {
		return await this.service.update(TaggedProductEntity, id, body);
	}

	async readRows(query: TReadTaggedProductSchemaOutput) {
		return await this.service.read(TaggedProductEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(TaggedProductEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(TaggedProductEntity, id, { soft: true });
	}
}
