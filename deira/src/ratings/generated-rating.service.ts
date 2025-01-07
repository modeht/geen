import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateRatingSchema, {
	TCreateRatingSchemaInput,
	TCreateRatingSchemaOutput,
} from './generated-schemas//create-rating.schema';
import UpdateRatingSchema, {
	TUpdateRatingSchemaInput,
	TUpdateRatingSchemaOutput,
} from './generated-schemas//update-rating.schema';
import ReadRatingSchema, {
	TReadRatingSchemaInput,
	TReadRatingSchemaOutput,
} from './generated-schemas//read-rating-query.schema';
import { RatingEntity } from './entities/rating.entity';

@Injectable()
export class RatingService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateRatingSchemaOutput) {
		return await this.service.create(RatingEntity, body);
	}

	async updateRow(id: number, body: TUpdateRatingSchemaOutput) {
		return await this.service.update(RatingEntity, id, body);
	}

	async readRows(query: TReadRatingSchemaOutput) {
		return await this.service.read(RatingEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(RatingEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(RatingEntity, id, { soft: true });
	}
}
