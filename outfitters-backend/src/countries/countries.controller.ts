import {
	BadRequestException,
	Controller,
	Get,
	InternalServerErrorException,
	Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginated } from '../globals/dto/paginated.dto';
import { CountriesService } from './countires.service';
import { parse as queryParser } from 'qs';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { file, safeParse } from 'valibot';
import { createWhere } from '../globals/lib/create-where';
import { createRelations } from '../globals/lib/create-relations';
import { MoQuery } from '../globals/decorators/mo-query.decorator';
import { toJsonSchema } from '@valibot/to-json-schema';
import { writeFile } from 'fs/promises';
import ReadCountrySchema, {
	TReadCountrySchemaOutput,
} from './generated-schemas/read-country-query.schema';
import ReadMediaSchema from '../media/generated-schemas/read-media-query.schema';
import { async as globAsync } from 'fast-glob';
import { dirname, join, relative, resolve, sep } from 'path';
import { fileURLToPath } from 'url';

function LogParameter(ctx?: ExecutionContext, ...args: any[]) {
	console.log(ctx, args);
	return function (target: object, propertyKey: string | symbol, parameterIndex: number) {
		console.log({ target, propertyKey, parameterIndex });
		const className = target.constructor.name;
		const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
		const paramType = paramTypes[parameterIndex];
		console.log(`Parameter type: ${paramType.name}`);
		console.log(
			`Parameter at index ${parameterIndex} in method ${String(propertyKey)} of class ${className} is being decorated.`,
		);
	};
}

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {
		// console.log(defs);
	}

	@Get()
	findSupported(@Query() paginated: Paginated) {
		return this.countriesService.findAll({
			where: { isSupported: true },
			take: paginated.limit,
			skip: paginated.page * paginated.limit,
		});
	}

	@Get('test')
	// @ApiOperation({
	// 	summary: 'Test endpoint for reading countries with query parameters',
	// 	parameters: [
	// 		{
	// 			name: 'query',
	// 			in: 'query',
	// 			schema: toJsonSchema(ReadCountrySchema, {
	// 				errorMode: 'ignore',
	// 			}) as any,
	// 		},
	// 	],
	// })
	@ApiQuery({
		name: 'query',
		schema: {
			$ref: '#/components/schemas/ReadCountryQuery',
		},
	})
	async testRead(@MoQuery(this, ReadCountrySchema) query: TReadCountrySchemaOutput) {
		// console.log(toJsonSchema(ReadCountrySchema, { errorMode: 'ignore' }));
		return 'true';
		// const where = createWhere(query);
		// const relations = createRelations(query, { depth: 1 });
		// const order = query['orders'];
		// const pagination = query['pagination'];

		// return this.countriesService.findAll({
		// 	where,
		// 	relations,
		// 	order: order as any,
		// 	...pagination,
		// });
	}
}
