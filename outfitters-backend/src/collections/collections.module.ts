import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { CollectionsAdminController } from './platform-web/collections-admin.controller';
import { WebCollectionsController } from './platform-web/collections.controller';

@Module({
	controllers: [
		WebCollectionsController,
		CollectionsController,
		CollectionsAdminController,
	],
	providers: [CollectionsService],
})
export class CollectionsModule {}
