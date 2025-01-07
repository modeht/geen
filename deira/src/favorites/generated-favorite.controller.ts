import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateFavoriteSchema, {
	TCreateFavoriteSchemaInput,
	TCreateFavoriteSchemaOutput,
} from './generated-schemas//create-favorite.schema';
import UpdateFavoriteSchema, {
	TUpdateFavoriteSchemaInput,
	TUpdateFavoriteSchemaOutput,
} from './generated-schemas//update-favorite.schema';
import ReadFavoriteSchema, {
	TReadFavoriteSchemaInput,
	TReadFavoriteSchemaOutput,
} from './generated-schemas//read-favorite-query.schema';
import { FavoriteEntity } from './entities/favorite.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { FavoriteService } from './generated-favorite.service';

@Controller('favorite')
export class FavoriteController {
	constructor(private service: FavoriteService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateFavorite,
		},
	})
	async create(@MoBody(CreateFavoriteSchema) body: TCreateFavoriteSchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateFavorite,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateFavoriteSchema) body: TUpdateFavoriteSchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadFavoriteQuery,
		},
	})
	async read(@MoQuery(ReadFavoriteSchema) query: TReadFavoriteSchemaOutput) {
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
