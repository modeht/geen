import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesAdminController } from './platform-web/categories-admin.controller';

@Module({
	controllers: [CategoriesController, CategoriesAdminController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
