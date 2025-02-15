import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../../generated/i18n.types';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  constructor(private i18n: I18nService<I18nTranslations>) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    console.error(
      `Timestamp: ${new Date().toISOString()}. Message: ${exception.message}. Stacktrace: ${exception.stack}}`,
    );
    console.error(`Request body, `, {
      body: request.body,
    });

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).send(exception);
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
      new InternalServerErrorException(
        this.i18n.t('error.generic.internalError', {
          lang: I18nContext.current().lang,
        }),
      ),
    );
  }
}
