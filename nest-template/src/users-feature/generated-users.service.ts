import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
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

@Injectable()
export class UsersService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateUsersSchemaOutput) {
		return await this.service.create(UsersEntity, body);
	}

	async updateRow(id: number, body: TUpdateUsersSchemaOutput) {
		return await this.service.update(UsersEntity, id, body);
	}

	async readRows(query: TReadUsersSchemaOutput) {
		return await this.service.read(UsersEntity, query);
	}

	async readOneRow(id: number, query: TReadOneUsersSchemaOutput) {
		return await this.service.readOne(UsersEntity, id, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(UsersEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(UsersEntity, id, { soft: true });
	}
}
