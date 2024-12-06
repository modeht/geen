import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../globals/services/abstract-service';
import CreateUserSchema, {
	TCreateUserSchemaInput,
	TCreateUserSchemaOutput,
} from './generated-schemas//create-user.schema';
import UpdateUserSchema, {
	TUpdateUserSchemaInput,
	TUpdateUserSchemaOutput,
} from './generated-schemas//update-user.schema';
import ReadUserSchema, {
	TReadUserSchemaInput,
	TReadUserSchemaOutput,
} from './generated-schemas//read-user-query.schema';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateUserSchemaOutput) {
		return await this.service.create(UserEntity, body);
	}

	async updateRow(id: number, body: TUpdateUserSchemaOutput) {
		return await this.service.update(UserEntity, id, body);
	}

	async readRows(query: TReadUserSchemaOutput) {
		return await this.service.read(UserEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(UserEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(UserEntity, id, { soft: true });
	}
}
