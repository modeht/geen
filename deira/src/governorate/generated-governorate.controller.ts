import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateGovernorateSchema, {
	TCreateGovernorateSchemaInput,
	TCreateGovernorateSchemaOutput,
} from './generated-schemas//create-governorate.schema';
import UpdateGovernorateSchema, {
	TUpdateGovernorateSchemaInput,
	TUpdateGovernorateSchemaOutput,
} from './generated-schemas//update-governorate.schema';
import ReadGovernorateSchema, {
	TReadGovernorateSchemaInput,
	TReadGovernorateSchemaOutput,
} from './generated-schemas//read-governorate-query.schema';
import { GovernorateEntity } from './entities/governorate.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { GovernorateService } from './generated-governorate.service';

@Controller('governorate')
export class GovernorateController {
	constructor(private service: GovernorateService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateGovernorate,
		},
	})
	async create(@MoBody(CreateGovernorateSchema) body: TCreateGovernorateSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateGovernorate,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateGovernorateSchema) body: TUpdateGovernorateSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadGovernorateQuery,
		},
	})
	async read(@MoQuery(ReadGovernorateSchema) query: TReadGovernorateSchemaOutput) {
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
