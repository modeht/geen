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
import { BaseIssue, BaseSchema, parse, safeParse } from 'valibot';
import {
	ReadCountrySchema,
	TReadCountrySchemaInput,
} from './generated-schemas/read-country.schema';
import {
	AllOperators,
	BoolOperators,
	DateOperators,
	NumberOperators,
	StringOperators,
} from '../globals/lib/comparable';
import {
	Equal,
	ILike,
	IsNull,
	LessThan,
	LessThanOrEqual,
	MoreThan,
	MoreThanOrEqual,
	Not,
} from 'typeorm';
import { createWhere } from '../globals/lib/create-where';

export const MoQuery = createParamDecorator((schema: any, ctx: ExecutionContext) => {
	if (!schema) {
		throw new InternalServerErrorException('Schema not provided');
	}
	const rawQuery = ctx
		.switchToHttp()
		.getRequest<FastifyRequest>()
		.originalUrl.split('?')[1];

	const payload = queryParser(rawQuery);
	const { success, issues, output } = safeParse(schema, payload);

	if (!success) throw new BadRequestException(issues);
	return output;
});

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get()
	findSupported(
		@Query() paginated: Paginated,
		@MoQuery(ReadCountrySchema) a: TReadCountrySchemaInput,
	) {
		return this.countriesService.findAll({
			where: { isSupported: true },
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
	}

	@Get('test')
	testRead(@MoQuery(ReadCountrySchema) query: TReadCountrySchemaInput) {
		const where = createWhere(query);
		return this.countriesService.findAll({
			where,
		});
	}
}
