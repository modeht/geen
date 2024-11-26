import {
	BadRequestException,
	Controller,
	Get,
	InternalServerErrorException,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginated } from '../globals/dto/paginated.dto';
import { CountriesService } from './countires.service';
import { parse as queryParser } from 'qs';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { safeParse } from 'valibot';
import {
	ReadCountrySchema,
	TReadCountrySchemaInput,
	TReadCountrySchemaOutput,
} from './generated-schemas/read-country.schema';

import { createWhere } from '../globals/lib/create-where';
import { createRelations } from '../globals/lib/create-relations';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { toJsonSchema } from '@valibot/to-json-schema';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get()
	findSupported(@Query() paginated: Paginated) {
		return this.countriesService.findAll({
			where: { isSupported: true },
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
	}

	@Get('test')
	testRead(@MoQuery(ReadCountrySchema) query: TReadCountrySchemaOutput) {
		const where = createWhere(query);
		const relations = createRelations(query, { depth: 1 });
		const order = query['orders'];
		const pagination = query['pagination'];
		console.dir(
			toJsonSchema(ReadCountrySchema, {
				errorMode: 'ignore',
			}).properties,
			{ depth: 5 },
		);

		return this.countriesService.findAll({
			where,
			relations,
			order: order as any,
			...pagination,
		});
	}
}
