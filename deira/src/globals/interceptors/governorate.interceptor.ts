import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Scope,
} from '@nestjs/common';
import { isArray, isObject } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageEnum } from '../../../lib/enums';
import { TranslationEntity } from '../../translations/entities/translation.entity';
import { FastifyRequest } from 'fastify';
import { DEFAULT_LANG } from '../constants';
import { GovernorateContext } from '../contexts/geo.context';

@Injectable({
  scope: Scope.REQUEST,
})
export class TranslationInterceptor implements NestInterceptor {
  constructor(private govContext: GovernorateContext) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const govern = request.headers['x-gov'] || request.query?.['gov'];
    if (!isNaN(+govern)) {
      this.govContext.set(govern);
    }
    return next.handle();
  }
}
