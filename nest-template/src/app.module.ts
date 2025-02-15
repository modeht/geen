import { GeenGlobalModule } from './geen/geen-global.module';
import { geenModules } from './geen-modules';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(process.cwd(), 'src/i18n/'),
        watch: true,
        includeSubfolders: true,
      },
      typesOutputPath: join(process.cwd(), 'src/generated/i18n.types.ts'),
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang'],
        },
        {
          use: HeaderResolver,
          options: ['x-lang'],
        },
        AcceptLanguageResolver,
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: [
        '.env.dev.local',
        '.env.staging.local',
        '.env.production.local',
        '.env.dev',
        '.env.staging',
        '.env.production',
        '.env',
      ],
      isGlobal: true,
    }),
    DbModule,
    GeenGlobalModule,
    ...geenModules,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
