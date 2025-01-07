import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateUserInterestSchema, {
	TCreateUserInterestSchemaInput,
	TCreateUserInterestSchemaOutput,
} from './generated-schemas//create-user-interest.schema';
import UpdateUserInterestSchema, {
	TUpdateUserInterestSchemaInput,
	TUpdateUserInterestSchemaOutput,
} from './generated-schemas//update-user-interest.schema';
import ReadUserInterestSchema, {
	TReadUserInterestSchemaInput,
	TReadUserInterestSchemaOutput,
} from './generated-schemas//read-user-interest-query.schema';
import { UserInterestEntity } from './entities/user-interests.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { UserInterestService } from './generated-user-interest.service';

@Controller('user-interest')
export class UserInterestController {
	constructor(private service: UserInterestService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateUserInterest,
		},
	})
	async create(@MoBody(CreateUserInterestSchema) body: TCreateUserInterestSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateUserInterest,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateUserInterestSchema) body: TUpdateUserInterestSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadUserInterestQuery,
		},
	})
	async read(@MoQuery(ReadUserInterestSchema) query: TReadUserInterestSchemaOutput) {
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
