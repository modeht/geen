import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { FastifyRequest } from 'fastify';
import { FindOptionsRelations } from 'typeorm';

function recursivelyAddField(obj = {}, parts = []) {
	if (!parts.length) {
		return obj;
	}
	if (parts.length > 1) {
		obj[parts[0]] = { ...obj[parts[0]] };
	} else {
		obj[parts[0]] = true;
	}
	return recursivelyAddField(obj[parts[0]], parts.slice(1));
}

function extractRelations<T>(include: string) {
	const includeArray = include.split(',');
	const relations: FindOptionsRelations<T> = {};

	for (const relation of includeArray) {
		const levels = relation.split('.');
		recursivelyAddField(relations, levels);
	}
	return relations;
}

function validateIncludeParameter(acceptedRelations: string[], include: string) {
	const parts = include.split(',');
	for (const part of parts) {
		if (!acceptedRelations.includes(part))
			throw new BadRequestException(
				`include parameter contains an invalid item. Accepted values are ${acceptedRelations.join(', ')}. Provided value is ${include}`,
			);
	}
}

function defineSwaggerMetadata(
	target: object,
	key: string | symbol | undefined,
	acceptedRelations: string[],
): void {
	const existingMetadata =
		Reflect.getMetadata(DECORATORS.API_PARAMETERS, target[key]) ?? [];
	Reflect.defineMetadata(
		DECORATORS.API_PARAMETERS,
		[
			...existingMetadata,
			{
				description: acceptedRelations.join(','),
				in: 'query',
				name: 'include',
				required: false,
				type: 'string',
			},
		],
		target[key],
	);
}

export const Relations = (acceptedRelations: string[] = []): ParameterDecorator =>
	createParamDecorator(
		(data: unknown, ctx: ExecutionContext) => {
			const request = ctx.switchToHttp().getRequest<FastifyRequest>();
			const query = request.query;
			const include = query['include'];

			if (include) {
				validateIncludeParameter(acceptedRelations, include);
				return extractRelations(include);
			}
			return {};
		},
		[(target, key) => defineSwaggerMetadata(target, key, acceptedRelations)],
	)();
