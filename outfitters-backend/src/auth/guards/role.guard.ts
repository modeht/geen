import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/role.decorator';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(ctx: ExecutionContext) {
		const roles = this.reflector.get(Roles, ctx.getHandler());
		const request = ctx.switchToHttp().getRequest<FastifyRequest>();
		const userRole = request.session.role;
		if (!roles.includes(userRole) && roles[0] !== '*') {
			throw new ForbiddenException('You are not allowed to use this endpoint');
		}
		return true;
	}
}
