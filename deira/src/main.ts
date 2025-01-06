import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyMultipart } from '@fastify/multipart';
import { join } from 'path';
import Handlebars from 'handlebars';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ResponseInterceptor } from './globals/interceptors/response.interceptor';
import { TranslationInterceptor } from './globals/interceptors/translation.interceptor';
import { ConfigService } from '@nestjs/config';
import { GeneralExceptionFilter } from './globals/filters/exception.filter';
import { I18nService } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.use(helmet());

  app.use(morgan('combined'));

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = [];
        errors.forEach((e) => {
          Object.values(e.constraints).forEach((m) => messages.push(m));
        });
        throw new BadRequestException(messages.join('. '));
      },
    }),
  );

  app.useStaticAssets({
    root: join(process.cwd(), 'public'),
    prefix: '/assets/',
  });

  app.setViewEngine({
    engine: {
      handlebars: Handlebars,
    },
    templates: join(process.cwd(), 'src/ui/views'),
  });

  app.enableVersioning({
    prefix: 'v',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api', {
    exclude: ['ui'],
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new TranslationInterceptor());
  app.useGlobalFilters(new GeneralExceptionFilter(app.get(I18nService)));

  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 20 * 1e6,
    },
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get('DOCKER_PORT') || configService.get('PORT');

  await app.listen(PORT, '0.0.0.0', () => {
    console.log(
      'API server listening on http://localhost:' + configService.get('PORT'),
    );
  });
}
bootstrap();
