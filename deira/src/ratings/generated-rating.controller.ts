import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { RatingService } from './generated-rating.service';

@Controller('rating')
export class RatingController {
	constructor(private service: RatingService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateRating,
		},
	})
	async create(@MoBody(CreateRatingSchema) body: TCreateRatingSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateRating,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateRatingSchema) body: TUpdateRatingSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadRatingQuery,
		},
	})
	async read(@MoQuery(ReadRatingSchema) query: TReadRatingSchemaOutput) {
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
}
