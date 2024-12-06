import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateBrandProfileSchema, {
	TCreateBrandProfileSchemaInput,
	TCreateBrandProfileSchemaOutput,
} from './generated-schemas//create-brand-profile.schema';
import UpdateBrandProfileSchema, {
	TUpdateBrandProfileSchemaInput,
	TUpdateBrandProfileSchemaOutput,
} from './generated-schemas//update-brand-profile.schema';
import ReadBrandProfileSchema, {
	TReadBrandProfileSchemaInput,
	TReadBrandProfileSchemaOutput,
} from './generated-schemas//read-brand-profile-query.schema';
import { BrandProfileEntity } from './entities/brand-profile.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../globals/decorators/mo-body.decorator';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { BrandProfileService } from './generated-brand-profile.service';

@Controller('brand-profile')
export class BrandProfileController {
	constructor(private service: BrandProfileService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateBrandProfile,
		},
	})
	async create(@MoBody(CreateBrandProfileSchema) body: TCreateBrandProfileSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateBrandProfile,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateBrandProfileSchema) body: TUpdateBrandProfileSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadBrandProfileQuery,
		},
	})
	async read(@MoQuery(ReadBrandProfileSchema) query: TReadBrandProfileSchemaOutput) {
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
