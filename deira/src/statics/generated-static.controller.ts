import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateStaticSchema, {
	TCreateStaticSchemaInput,
	TCreateStaticSchemaOutput,
} from './generated-schemas//create-static.schema';
import UpdateStaticSchema, {
	TUpdateStaticSchemaInput,
	TUpdateStaticSchemaOutput,
} from './generated-schemas//update-static.schema';
import ReadStaticSchema, {
	TReadStaticSchemaInput,
	TReadStaticSchemaOutput,
} from './generated-schemas//read-static-query.schema';
import { StaticEntity } from './entities/static.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { StaticService } from './generated-static.service';

@Controller('static')
export class StaticController {
	constructor(private service: StaticService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateStatic,
		},
	})
	async create(@MoBody(CreateStaticSchema) body: TCreateStaticSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateStatic,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateStaticSchema) body: TUpdateStaticSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadStaticQuery,
		},
	})
	async read(@MoQuery(ReadStaticSchema) query: TReadStaticSchemaOutput) {
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
