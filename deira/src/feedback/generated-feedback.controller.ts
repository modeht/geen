import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateFeedbackSchema, {
	TCreateFeedbackSchemaInput,
	TCreateFeedbackSchemaOutput,
} from './generated-schemas//create-feedback.schema';
import UpdateFeedbackSchema, {
	TUpdateFeedbackSchemaInput,
	TUpdateFeedbackSchemaOutput,
} from './generated-schemas//update-feedback.schema';
import ReadFeedbackSchema, {
	TReadFeedbackSchemaInput,
	TReadFeedbackSchemaOutput,
} from './generated-schemas//read-feedback-query.schema';
import { FeedbackEntity } from './entities/feedback.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { FeedbackService } from './generated-feedback.service';

@Controller('feedback')
export class FeedbackController {
	constructor(private service: FeedbackService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateFeedback,
		},
	})
	async create(@MoBody(CreateFeedbackSchema) body: TCreateFeedbackSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateFeedback,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateFeedbackSchema) body: TUpdateFeedbackSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadFeedbackQuery,
		},
	})
	async read(@MoQuery(ReadFeedbackSchema) query: TReadFeedbackSchemaOutput) {
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
