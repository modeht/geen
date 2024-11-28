import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
	InternalServerErrorException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { parse as queryParser } from 'qs';
import { safeParse } from 'valibot';

export const MoQuery = createParamDecorator((schema: any, ctx: ExecutionContext) => {
	if (!schema) {
		throw new InternalServerErrorException('Schema not provided');
	}
	const classRef = ctx.getClass();
	const functionRef = ctx.getHandler();
	// const args = ctx.getArgs();
	// const paramTypes = Reflect.getMetadata('design:paramtypes', classRef, functionRef.name);
	// const paramTypes = Reflect.getMetadata('design:paramtypes', classRef);
	// console.log(args[0]);
	console.log(Reflect.getMetadataKeys(functionRef));
	Reflect.defineMetadata('schema', schema, functionRef);
	console.log(Reflect.getMetadataKeys(functionRef));
	console.log(Reflect.getMetadata('querySchema', functionRef));

	const rawQuery = ctx
		.switchToHttp()
		.getRequest<FastifyRequest>()
		.originalUrl.split('?')[1];

	const payload = queryParser(rawQuery);
	const { success, issues, output } = safeParse(schema, payload);

	if (!success) throw new BadRequestException(issues);
	return output;
});
