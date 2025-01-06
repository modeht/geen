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

function mapTranslationsRecursivly(field: any, lang: LanguageEnum) {
  if (isArray(field)) {
    field.forEach((i) => {
      mapTranslationsRecursivly(i, lang);
    });
  } else if (isObject(field)) {
    const translations = (field['translations'] || []) as TranslationEntity[];
    const translationItem = translations?.find((tr) => tr.language === lang);

    Object.keys(field).forEach((key) => {
      if (typeof field[key] === 'string') {
        if (translationItem?.columns[key]) {
          field[key] = translationItem.columns[key];
        }
      } else if (isObject(field[key]) || isArray(field[key])) {
        mapTranslationsRecursivly(field[key], lang);
      }
    });

    delete field['translations'];
  }

  return field;
}

@Injectable({
  scope: Scope.REQUEST,
})
export class TranslationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const lang = (request.headers['x-lang'] ||
      request.query?.['lang'] ||
      DEFAULT_LANG) as LanguageEnum;

    return next.handle().pipe(
      map((data) => {
        return mapTranslationsRecursivly(data, lang);
      }),
    );
  }
}
