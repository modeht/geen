import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyMultipart } from '@fastify/multipart';
import { join } from 'path';
import Handlebars from 'handlebars';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { GeneralExceptionFilter } from './globals/filters/exception.filter';
import { I18nService } from 'nestjs-i18n';
import { writeFile } from 'fs/promises';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createComponentsSchemas } from './geen/openapi/generate-openapi-components';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: {
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
					},
				},
			},
		}),
	);

	app.use(helmet());
	app.enableCors();

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

	//global exception filter
	// app.useGlobalFilters(new GeneralExceptionFilter(app.get(I18nService)));

	//set prefix and versioning
	// app.enableVersioning({
	// 	prefix: 'v',
	// 	defaultVersion: '1',
	// 	type: VersioningType.URI,
	// });

	// app.setGlobalPrefix('api', {
	// 	exclude: ['ui'],
	// });

	await app.register(fastifyMultipart, {
		limits: {
			fileSize: 20 * 1e6, // 20MB
		},
	});

	//generate documentation
	// const config = new DocumentBuilder()
	// 	.setTitle('Nestjs Template API')
	// 	.addBearerAuth()
	// 	.setVersion('0.1.0')
	// 	.setExternalDoc('Postman Collection', '/jsondocs')
	// 	.build();

	// const componentsSchemas = await createComponentsSchemas();
	// const document = SwaggerModule.createDocument(app, config);

	// document.components.schemas = {
	// 	...document.components.schemas,
	// 	...componentsSchemas,
	// };
	// SwaggerModule.setup('docs', app, document);
	// writeFile('./openapi-schema.json', JSON.stringify(document, null, 4));

	const configService = app.get(ConfigService);
	const PORT = configService.get('PORT');

	await app.listen(PORT, '0.0.0.0', () => {
		console.log('API server listening on http://localhost:' + PORT);
	});
}
bootstrap();
