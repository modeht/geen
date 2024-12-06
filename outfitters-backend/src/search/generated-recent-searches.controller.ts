import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateRecentSearchesSchema, {
	TCreateRecentSearchesSchemaInput,
	TCreateRecentSearchesSchemaOutput,
} from './generated-schemas//create-recent-searches.schema';
import UpdateRecentSearchesSchema, {
	TUpdateRecentSearchesSchemaInput,
	TUpdateRecentSearchesSchemaOutput,
} from './generated-schemas//update-recent-searches.schema';
import ReadRecentSearchesSchema, {
	TReadRecentSearchesSchemaInput,
	TReadRecentSearchesSchemaOutput,
} from './generated-schemas//read-recent-searches-query.schema';
import { RecentSearchesEntity } from './entities/recent-searches.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../globals/decorators/mo-body.decorator';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { RecentSearchesService } from './generated-recent-searches.service';

@Controller('recent-searches')
export class RecentSearchesController {
	constructor(private service: RecentSearchesService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateRecentSearches,
		},
	})
	async create(@MoBody(CreateRecentSearchesSchema) body: TCreateRecentSearchesSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateRecentSearches,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateRecentSearchesSchema) body: TUpdateRecentSearchesSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadRecentSearchesQuery,
		},
	})
	async read(@MoQuery(ReadRecentSearchesSchema) query: TReadRecentSearchesSchemaOutput) {
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
