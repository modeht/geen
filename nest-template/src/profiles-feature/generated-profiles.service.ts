import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AbstractService } from '../geen/services/abstract-service';
import CreateProfilesSchema, {
	TCreateProfilesSchemaInput,
	TCreateProfilesSchemaOutput,
} from './generated-schemas//create-profiles.schema';
import UpdateProfilesSchema, {
	TUpdateProfilesSchemaInput,
	TUpdateProfilesSchemaOutput,
} from './generated-schemas//update-profiles.schema';
import ReadProfilesSchema, {
	TReadProfilesSchemaInput,
	TReadProfilesSchemaOutput,
} from './generated-schemas//read-profiles-query.schema';
import { ProfilesEntity } from './entities/profiles.entity';

@Injectable()
export class ProfilesService {
	constructor(
		private datasource: DataSource,
		private service: AbstractService,
	) {}

	async createRow(body: TCreateProfilesSchemaOutput) {
		return await this.service.create(ProfilesEntity, body);
	}

	async updateRow(id: number, body: TUpdateProfilesSchemaOutput) {
		return await this.service.update(ProfilesEntity, id, body);
	}

	async readRows(query: TReadProfilesSchemaOutput) {
		return await this.service.read(ProfilesEntity, query);
	}

	async deleteRow(id: number) {
		return await this.service.delete(ProfilesEntity, id);
	}

	async softDeleteRow(id: number) {
		return await this.service.delete(ProfilesEntity, id, { soft: true });
	}
}
