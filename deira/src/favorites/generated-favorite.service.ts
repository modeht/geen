import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateFavoriteSchema, {
	TCreateFavoriteSchemaInput,
	TCreateFavoriteSchemaOutput,
} from './generated-schemas//create-favorite.schema';
import UpdateFavoriteSchema, {
	TUpdateFavoriteSchemaInput,
	TUpdateFavoriteSchemaOutput,
} from './generated-schemas//update-favorite.schema';
import ReadFavoriteSchema, {
	TReadFavoriteSchemaInput,
	TReadFavoriteSchemaOutput,
} from './generated-schemas//read-favorite-query.schema';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateFavoriteSchemaOutput) {
		return await this.service.create(FavoriteEntity, body);
	}

	async updateRow(id: number, body: TUpdateFavoriteSchemaOutput) {
		return await this.service.update(FavoriteEntity, id, body);
	}

	async readRows(query: TReadFavoriteSchemaOutput) {
		return await this.service.read(FavoriteEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(FavoriteEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(FavoriteEntity, id, { soft: true });
	}
}
