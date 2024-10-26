import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { AuthContext } from '../auth.context';
import { SessionToken } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private authContext: AuthContext,
	) {}

	async canActivate(ctx: ExecutionContext) {
		const request = ctx.switchToHttp().getRequest<FastifyRequest>();
		const token = request.headers?.authorization?.split(' ') || [];
		if (token[0]?.toLocaleLowerCase() !== 'bearer') {
			throw new ForbiddenException('Bearer token malformed');
		}
		if (!token[1]) {
			throw new ForbiddenException('Authorization token missing');
		}

		try {
			const payload = await this.jwtService.verifyAsync<SessionToken>(token[1], {
				secret: this.configService.getOrThrow('JWT_SECRET'),
			});
			request.session = payload;
			this.authContext.setUser(request.session);
		} catch (error: any) {
			throw new ForbiddenException('Authorization token malformed');
		}
		return true;
	}
}
