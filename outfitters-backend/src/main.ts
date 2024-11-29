import { fastifyMultipart } from '@fastify/multipart';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, RouterModule } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import Handlebars from 'handlebars';
import helmet from 'helmet';
import morgan from 'morgan';
import { join, sep, relative } from 'path';
import { AppModule } from './app.module';
import { GeneralExceptionFilter } from './globals/filters/exception.filter';
import { ResponseInterceptor } from './globals/interceptors/response.interceptor';
import 'reflect-metadata';
import { async } from 'fast-glob';
import { toJsonSchema } from '@valibot/to-json-schema';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	// (app['container']['modules'] as Map<any, any>).forEach((m) => {
	// 	const keys = Reflect.getMetadataKeys(m._metatype);
	// 	for (const key of keys) {
	// 		console.log(key);
	// 		if (key === 'controllers') {
	// 			const controllers = Reflect.getMetadata(key, m._metatype);
	// 			for (const controller of controllers) {
	// 				const cKeys = Reflect.getMetadataKeys(controller);
	// 				// console.log(cKeys);
	// 				for (const ck of cKeys) {
	// 					console.log(Reflect.getMetadata(ck, controller));
	// 				}
	// 				break;
	// 			}
	// 		}
	// 	}
	// });

	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: [`'self'`],
					styleSrc: [`'self'`, `'unsafe-inline'`],
					imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
					scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
				},
			},
		}),
	);

	app.use(morgan('combined'));

	app.enableCors();

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: false,
			exceptionFactory: (errors: ValidationError[]) => {
				const messages = [];
				errors.forEach((e) => {
					Object.values(e.constraints ?? []).forEach((m) => messages.push(m));
					e.children?.forEach((child) => {
						Object.values(child.constraints ?? []).forEach((m) => messages.push(m));
						child.children?.forEach((c) => {
							Object.values(c.constraints ?? []).forEach((m) => messages.push(m));
						});
					});
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
	app.useGlobalFilters(new GeneralExceptionFilter());

	await app.register(fastifyMultipart, {
		limits: {
			fileSize: 20 * 1e6,
		},
	});

	const config = new DocumentBuilder()
		.setTitle('Outfitters')
		.addBearerAuth()
		.setDescription('Outfitters API description')
		.setVersion('0.1')
		.setExternalDoc('Postman Collection', '/docs-json')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	console.log(document);
	document.components.schemas = {
		...document.components.schemas,
		// ...getDefs(),
	};
	SwaggerModule.setup('docs', app, document);

	// console.log(document);
	// console.dir(document.paths['/api/v1/countries/test'], { depth: null });
	// console.log(app.getHttpAdapter());
	// app.getHttpServer();
	// await createSchemas();

	const configService = app.get(ConfigService);
	const PORT = configService.get('DOCKER_PORT') || configService.get('PORT');

	await app.listen(PORT, '0.0.0.0', () => {
		console.log('API server listening on http://localhost:' + configService.get('PORT'));
	});
}
bootstrap();
