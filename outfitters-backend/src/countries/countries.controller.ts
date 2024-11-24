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
		console.log(a);
		console.log(ReadCountrySchema);
		console.log(createWhere(a));
		return this.countriesService.findAll({
			where: { isSupported: true },
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
	}
}

function createWhere(query: any) {
	const filters = query['filters'];
	const where: Record<string, any> = {};
	if (filters) {
		for (const key in filters) {
			if (!key.startsWith('$')) {
			}
			const value = filters[key]['$val'];
			const operator = filters[key]['$op'];

			const typeormValue = mapOperators(operator, value);
			where[key] = typeormValue;
		}
	}
	return where;
}

function mapOperators(operator: AllOperators, value: string | number | boolean) {
	switch (operator) {
		case AllOperators.Contains:
			return ILike(`%${value}%`);

		case AllOperators.Eq:
		case AllOperators.Is:
			return Equal(value);

		case AllOperators.NotEq:
		case AllOperators.IsNot:
			return Not(value);

		case AllOperators.IsNull:
			return IsNull();

		case AllOperators.IsNotNull:
			return Not(IsNull());

		case AllOperators.EndsWith:
			return ILike(`%${value}`);

		case AllOperators.StartsWith:
			return ILike(`${value}%`);

		case AllOperators.GreaterThan:
			return MoreThan(value);
		case AllOperators.LessThan:
			return LessThan(value);

		case AllOperators.GreaterThanOrEq:
			return MoreThanOrEqual(value);

		case AllOperators.LessThanOrEq:
			return LessThanOrEqual(value);

		default:
			return null;
	}
}
