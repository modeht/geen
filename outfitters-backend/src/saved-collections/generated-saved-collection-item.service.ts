import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateSavedCollectionItemSchema, {
	TCreateSavedCollectionItemSchemaInput,
	TCreateSavedCollectionItemSchemaOutput,
} from './generated-schemas//create-saved-collection-item.schema';
import UpdateSavedCollectionItemSchema, {
	TUpdateSavedCollectionItemSchemaInput,
	TUpdateSavedCollectionItemSchemaOutput,
} from './generated-schemas//update-saved-collection-item.schema';
import ReadSavedCollectionItemSchema, {
	TReadSavedCollectionItemSchemaInput,
	TReadSavedCollectionItemSchemaOutput,
} from './generated-schemas//read-saved-collection-item-query.schema';
import { SavedCollectionItemEntity } from './entities/saved-collection-item.entity';

@Injectable()
export class SavedCollectionItemService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateSavedCollectionItemSchemaOutput) {
		return await this.service.create(SavedCollectionItemEntity, body);
	}

	async updateRow(id: number, body: TUpdateSavedCollectionItemSchemaOutput) {
		return await this.service.update(SavedCollectionItemEntity, id, body);
	}

	async readRows(query: TReadSavedCollectionItemSchemaOutput) {
		return await this.service.read(SavedCollectionItemEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(SavedCollectionItemEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(SavedCollectionItemEntity, id, { soft: true });
	}
}
