import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateBannerSchema, {
	TCreateBannerSchemaInput,
	TCreateBannerSchemaOutput,
} from './generated-schemas//create-banner.schema';
import UpdateBannerSchema, {
	TUpdateBannerSchemaInput,
	TUpdateBannerSchemaOutput,
} from './generated-schemas//update-banner.schema';
import ReadBannerSchema, {
	TReadBannerSchemaInput,
	TReadBannerSchemaOutput,
} from './generated-schemas//read-banner-query.schema';
import { BannerEntity } from './entities/banner.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { BannerService } from './generated-banner.service';

@Controller('banner')
export class BannerController {
	constructor(private service: BannerService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateBanner,
		},
	})
	async create(@MoBody(CreateBannerSchema) body: TCreateBannerSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateBanner,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateBannerSchema) body: TUpdateBannerSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadBannerQuery,
		},
	})
	async read(@MoQuery(ReadBannerSchema) query: TReadBannerSchemaOutput) {
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
