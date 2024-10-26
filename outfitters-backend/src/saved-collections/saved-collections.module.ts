import { Module } from '@nestjs/common';
import { SavedCollectionsController } from './saved-collections.controller';
import { SavedCollectionsService } from './saved-collections.service';

@Module({
	controllers: [SavedCollectionsController],
	providers: [SavedCollectionsService],
})
export class SavedCollectionsModule {}
