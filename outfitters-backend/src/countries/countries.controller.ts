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
import { writeFile } from 'fs/promises';
import { ReadMediaFiltersSchema } from '../media/generated-schemas/read-media-filters.schema';

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
		required: false,
		schema: toJsonSchema(ReadCountrySchema, { errorMode: 'ignore' }) as any,
		// schema: {
		// 	type: 'object',
		// 	properties: {
		// 		name: {
		// 			type: 'string',
		// 		},`
		// 	},
		// 	title: 'test',
		// },
		// type: ,
		// items:
	})
	testRead(
		@MoQuery(ReadCountrySchema) query: TReadCountrySchemaOutput,
		// @LogParameter() age: number,
	) {
		// console.log(toJsonSchema(ReadCountrySchema, { errorMode: 'ignore' }));
		writeFile(
			'./jsonschema.json',
			JSON.stringify(
				toJsonSchema(ReadCountrySchema, {
					errorMode: 'ignore',
					definitions: {
						ReadMediaFiltersSchema,
					},
				}),
				null,
				4,
			),
		);
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
