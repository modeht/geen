import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateMessageSchema, {
	TCreateMessageSchemaInput,
	TCreateMessageSchemaOutput,
} from './generated-schemas//create-message.schema';
import UpdateMessageSchema, {
	TUpdateMessageSchemaInput,
	TUpdateMessageSchemaOutput,
} from './generated-schemas//update-message.schema';
import ReadMessageSchema, {
	TReadMessageSchemaInput,
	TReadMessageSchemaOutput,
} from './generated-schemas//read-message-query.schema';
import { MessageEntity } from './entities/message.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { MessageService } from './generated-message.service';

@Controller('message')
export class MessageController {
	constructor(private service: MessageService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateMessage,
		},
	})
	async create(@MoBody(CreateMessageSchema) body: TCreateMessageSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateMessage,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateMessageSchema) body: TUpdateMessageSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadMessageQuery,
		},
	})
	async read(@MoQuery(ReadMessageSchema) query: TReadMessageSchemaOutput) {
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
