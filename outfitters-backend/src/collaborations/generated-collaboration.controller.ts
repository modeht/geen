import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateCollaborationSchema, {
	TCreateCollaborationSchemaInput,
	TCreateCollaborationSchemaOutput,
} from './generated-schemas//create-collaboration.schema';
import UpdateCollaborationSchema, {
	TUpdateCollaborationSchemaInput,
	TUpdateCollaborationSchemaOutput,
} from './generated-schemas//update-collaboration.schema';
import ReadCollaborationSchema, {
	TReadCollaborationSchemaInput,
	TReadCollaborationSchemaOutput,
} from './generated-schemas//read-collaboration-query.schema';
import { CollaborationEntity } from './entities/collaboration.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../globals/decorators/mo-body.decorator';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { CollaborationService } from './generated-collaboration.service';

@Controller('collaboration')
export class CollaborationController {
	constructor(private service: CollaborationService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateCollaboration,
		},
	})
	async create(@MoBody(CreateCollaborationSchema) body: TCreateCollaborationSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateCollaboration,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateCollaborationSchema) body: TUpdateCollaborationSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadCollaborationQuery,
		},
	})
	async read(@MoQuery(ReadCollaborationSchema) query: TReadCollaborationSchemaOutput) {
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
