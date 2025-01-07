import { Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import CreateCountrySchema, {
	TCreateCountrySchemaInput,
	TCreateCountrySchemaOutput,
} from './generated-schemas//create-country.schema';
import UpdateCountrySchema, {
	TUpdateCountrySchemaInput,
	TUpdateCountrySchemaOutput,
} from './generated-schemas//update-country.schema';
import ReadCountrySchema, {
	TReadCountrySchemaInput,
	TReadCountrySchemaOutput,
} from './generated-schemas//read-country-query.schema';
import { CountryEntity } from './entities/country.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { SchemaDefs } from '../schema-defs';
import { MoBody } from '../geen/decorators/mo-body.decorator';
import { MoQuery } from '../geen/decorators/mo-query.decorator';
import { CountryService } from './generated-country.service';

@Controller('country')
export class CountryController {
	constructor(private service: CountryService) {}

	@Post()
	@ApiBody({
		schema: {
			$ref: SchemaDefs.CreateCountry,
		},
	})
	async create(@MoBody(CreateCountrySchema) body: TCreateCountrySchemaOutput) {
		return this.service.createRow(body);
	}

	@Put(':id')
	@ApiBody({
		schema: {
			$ref: SchemaDefs.UpdateCountry,
		},
	})
	async update(@Param('id') id: string, @MoBody(UpdateCountrySchema) body: TUpdateCountrySchemaOutput) {
		return this.service.updateRow(+id, body);
	}

	@Get()
	@ApiQuery({
		schema: {
			$ref: SchemaDefs.ReadCountryQuery,
		},
	})
	async read(@MoQuery(ReadCountrySchema) query: TReadCountrySchemaOutput) {
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
