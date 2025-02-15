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

	const rawQuery = ctx.switchToHttp().getRequest<FastifyRequest>().originalUrl.split('?')[1];

	const payload = queryParser(rawQuery);
	const { success, issues, output } = safeParse(schema, payload, {
		abortEarly: true,
		abortPipeEarly: true,
	});

	if (!success) throw new BadRequestException(`${issues?.[0]?.path?.[0]?.key}: ${issues?.[0]?.message}`);

	return output;
});