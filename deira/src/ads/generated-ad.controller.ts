import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateAdSchema, { TCreateAdSchemaInput, TCreateAdSchemaOutput } from './generated-schemas//create-ad.schema';
import UpdateAdSchema, { TUpdateAdSchemaInput, TUpdateAdSchemaOutput } from './generated-schemas//update-ad.schema';
import ReadAdSchema, { TReadAdSchemaInput, TReadAdSchemaOutput } from './generated-schemas//read-ad-query.schema';
import { AdEntity } from './entities/ad.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { AdService } from './generated-ad.service';

@Controller('ad')
export class AdController {
	constructor(private service: AdService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateAd,
		},
	})
	async create(@MoBody(CreateAdSchema) body: TCreateAdSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateAd,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateAdSchema) body: TUpdateAdSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadAdQuery,
		},
	})
	async read(@MoQuery(ReadAdSchema) query: TReadAdSchemaOutput) {
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
