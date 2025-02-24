import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { ReviewsService } from './generated-reviews.service';

@Controller('reviews')
export class ReviewsController {
	constructor(private service: ReviewsService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateReviews,
		},
	})
	async create(@MoBody(CreateReviewsSchema) body: TCreateReviewsSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateReviews,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateReviewsSchema) body: TUpdateReviewsSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadReviewsQuery,
		},
	})
	async read(@MoQuery(ReadReviewsSchema) query: TReadReviewsSchemaOutput) {
		return this.service.readRows(query);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.service.deleteRow(+id);
	}

	@Delete(':id/soft')
	async softDelete(@Param('id') id: string) {
		return this.service.softDeleteRow(+id);
	}

	@Get(':id')
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadOneReviewsQuery,
		},
	})
	async readOne(@Param('id') id: string, @MoQuery(ReadOneReviewsSchema) query: TReadOneReviewsSchemaOutput) {
		return this.service.readOneRow(+id, query);
	}
}
