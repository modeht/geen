import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.getOrThrow('POSTGRES_HOST'),
					port: configService.getOrThrow('POSTGRES_PORT'),
					username: configService.getOrThrow('POSTGRES_USER'),
					password: configService.getOrThrow('POSTGRES_PASSWORD'),
					database: configService.getOrThrow('POSTGRES_DB'),
					entities: [__dirname + '/../**/*.entity{.ts,.js}'],
					synchronize: configService.get('NODE_ENV') === 'development' ? true : false,
					logger: 'advanced-console',
					timezone: 'Z',
					charset: 'utf8mb4',
					poolSize: 5,
					logging: ['query'],
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class DbModule {}
