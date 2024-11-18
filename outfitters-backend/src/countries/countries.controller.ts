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
import { parse, safeParse } from 'valibot';
import {
	ReadCountrySchema,
	ReadCountrySchemaFilters,
} from './generated-schemas/read-country.schema';

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
		@MoQuery(ReadCountrySchema) a: ReadCountrySchemaFilters,
	) {
		console.log(a);
		return this.countriesService.findAll({
			where: { isSupported: true },
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
	}
}
