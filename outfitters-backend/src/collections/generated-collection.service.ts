import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateCollectionSchema, {
	TCreateCollectionSchemaInput,
	TCreateCollectionSchemaOutput,
} from './generated-schemas//create-collection.schema';
import UpdateCollectionSchema, {
	TUpdateCollectionSchemaInput,
	TUpdateCollectionSchemaOutput,
} from './generated-schemas//update-collection.schema';
import ReadCollectionSchema, {
	TReadCollectionSchemaInput,
	TReadCollectionSchemaOutput,
} from './generated-schemas//read-collection-query.schema';
import { CollectionEntity } from './entities/collection.entity';

@Injectable()
export class CollectionService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateCollectionSchemaOutput) {
		return await this.service.create(CollectionEntity, body);
	}

	async updateRow(id: number, body: TUpdateCollectionSchemaOutput) {
		return await this.service.update(CollectionEntity, id, body);
	}

	async readRows(query: TReadCollectionSchemaOutput) {
		return await this.service.read(CollectionEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(CollectionEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(CollectionEntity, id, { soft: true });
	}
}
