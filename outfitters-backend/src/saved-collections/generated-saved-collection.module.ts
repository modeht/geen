import { Module } from '@nestjs/common';
import { SavedCollectionService } from './generated-saved-collection.service';
import { SavedCollectionController } from './generated-saved-collection.controller';

@Module({
	imports: [],
	controllers: [SavedCollectionController],
	providers: [SavedCollectionService],
	exports: [SavedCollectionService],
})
export class SavedCollectionModule {}
