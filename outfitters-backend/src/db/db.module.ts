import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.getOrThrow('POSTGRES_HOST'),
					port: configService.getOrThrow('POSTGRES_DOCKER_PORT'),
					username: configService.getOrThrow('POSTGRES_USER'),
					password: configService.getOrThrow('POSTGRES_PASSWORD'),
					database: configService.getOrThrow('POSTGRES_DB'),
					entities: [join(process.cwd(), 'dist/**/*.entity.js')],
					synchronize: process.env.NODE_ENV === 'development' ? true : false,
					logger: 'advanced-console',
					timezone: 'Z',
					charset: 'utf8mb4',
					poolSize: 20,
					logging: 'all',
					maxQueryExecutionTime: 2000,
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class DbModule {}
