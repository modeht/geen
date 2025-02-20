import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
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
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { ProfilesService } from './generated-profiles.service';

@Controller('profiles')
export class ProfilesController {
	constructor(private service: ProfilesService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateProfiles,
		},
	})
	async create(@MoBody(CreateProfilesSchema) body: TCreateProfilesSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateProfiles,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateProfilesSchema) body: TUpdateProfilesSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadProfilesQuery,
		},
	})
	async read(@MoQuery(ReadProfilesSchema) query: TReadProfilesSchemaOutput) {
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
