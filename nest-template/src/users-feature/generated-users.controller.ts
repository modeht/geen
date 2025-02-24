import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateUsersSchema, {
	TCreateUsersSchemaInput,
	TCreateUsersSchemaOutput,
} from './generated-schemas//create-users.schema';
import UpdateUsersSchema, {
	TUpdateUsersSchemaInput,
	TUpdateUsersSchemaOutput,
} from './generated-schemas//update-users.schema';
import ReadUsersSchema, {
	TReadUsersSchemaInput,
	TReadUsersSchemaOutput,
} from './generated-schemas//read-users-query.schema';
import ReadOneUsersSchema, {
	TReadOneUsersSchemaInput,
	TReadOneUsersSchemaOutput,
} from './generated-schemas//read-one-users-query.schema';
import { UsersEntity } from './entities/users.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { UsersService } from './generated-users.service';

@Controller('users')
export class UsersController {
	constructor(private service: UsersService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateUsers,
		},
	})
	async create(@MoBody(CreateUsersSchema) body: TCreateUsersSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateUsers,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateUsersSchema) body: TUpdateUsersSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadUsersQuery,
		},
	})
	async read(@MoQuery(ReadUsersSchema) query: TReadUsersSchemaOutput) {
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
			$ref: SchemaDefs.ReadOneUsersQuery,
		},
	})
	async readOne(@Param('id') id: string, @MoQuery(ReadOneUsersSchema) query: TReadOneUsersSchemaOutput) {
		return this.service.readOneRow(+id, query);
	}
}
