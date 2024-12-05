import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateCommentSchema, {
	TCreateCommentSchemaInput,
	TCreateCommentSchemaOutput,
} from './generated-schemas//create-comment.schema';
import UpdateCommentSchema, {
	TUpdateCommentSchemaInput,
	TUpdateCommentSchemaOutput,
} from './generated-schemas//update-comment.schema';
import ReadCommentSchema, {
	TReadCommentSchemaInput,
	TReadCommentSchemaOutput,
} from './generated-schemas//read-comment-query.schema';
import { CommentEntity } from './entities/comment.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../globals/decorators/mo-body.decorator';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { CommentService } from './generated-comment.service';

@Controller('comment')
export class CommentController {
	constructor(private service: CommentService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateComment,
		},
	})
	async create(@MoBody(CreateCommentSchema) body: TCreateCommentSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateComment,
		},
	})
	async update(
		@Param('id') id: string,
		@MoBody(UpdateCommentSchema) body: TUpdateCommentSchemaOutput,
	) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadCommentQuery,
		},
	})
	async read(@MoQuery(ReadCommentSchema) query: TReadCommentSchemaOutput) {
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
