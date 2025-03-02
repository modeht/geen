import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
	InternalServerErrorException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { safeParse } from 'valibot';
import { metadataSymbol } from '../constants/schema-symbols';

export const MoBody = createParamDecorator((schema: any, ctx: ExecutionContext) => {
	if (!schema) {
		throw new InternalServerErrorException('Schema not provided');
	}
	const body = ctx.switchToHttp().getRequest<FastifyRequest>().body;

	const { success, issues, output } = safeParse(schema, body, {
		abortEarly: true,
		abortPipeEarly: true,
	});

	if (!success) throw new BadRequestException(`${issues?.[0].path?.[0].key}: ${issues?.[0]?.message}`);
	let metadata: Record<string, string> | null = null;
	if (schema.pipe) {
		metadata = schema.pipe.find((p: Record<string, any>) => p.kind === 'metadata')?.metadata;
	}
	return { ...output, [metadataSymbol]: metadata };
});
