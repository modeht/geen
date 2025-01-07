import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
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

@Injectable()
export class UserInterestService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateUserInterestSchemaOutput) {
		return await this.service.create(UserInterestEntity, body);
	}

	async updateRow(id: number, body: TUpdateUserInterestSchemaOutput) {
		return await this.service.update(UserInterestEntity, id, body);
	}

	async readRows(query: TReadUserInterestSchemaOutput) {
		return await this.service.read(UserInterestEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(UserInterestEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(UserInterestEntity, id, { soft: true });
	}
}
