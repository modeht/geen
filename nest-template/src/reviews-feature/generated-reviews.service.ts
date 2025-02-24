import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateReviewsSchema, {
	TCreateReviewsSchemaInput,
	TCreateReviewsSchemaOutput,
} from './generated-schemas//create-reviews.schema';
import UpdateReviewsSchema, {
	TUpdateReviewsSchemaInput,
	TUpdateReviewsSchemaOutput,
} from './generated-schemas//update-reviews.schema';
import ReadReviewsSchema, {
	TReadReviewsSchemaInput,
	TReadReviewsSchemaOutput,
} from './generated-schemas//read-reviews-query.schema';
import ReadOneReviewsSchema, {
	TReadOneReviewsSchemaInput,
	TReadOneReviewsSchemaOutput,
} from './generated-schemas//read-one-reviews-query.schema';
import { ReviewsEntity } from './entities/reviews.entity';

@Injectable()
export class ReviewsService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateReviewsSchemaOutput) {
		return await this.service.create(ReviewsEntity, body);
	}

	async updateRow(id: number, body: TUpdateReviewsSchemaOutput) {
		return await this.service.update(ReviewsEntity, id, body);
	}

	async readRows(query: TReadReviewsSchemaOutput) {
		return await this.service.read(ReviewsEntity, query);
	}

	async readOneRow(id: number, query: TReadOneReviewsSchemaOutput) {
		return await this.service.readOne(ReviewsEntity, id, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(ReviewsEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(ReviewsEntity, id, { soft: true });
	}
}
