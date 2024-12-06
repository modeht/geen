import { Module } from '@nestjs/common';
import { SavedCollectionItemService } from './generated-saved-collection-item.service';
import { SavedCollectionItemController } from './generated-saved-collection-item.controller';

@Module({
	imports: [],
	controllers: [SavedCollectionItemController],
	providers: [SavedCollectionItemService],
	exports: [SavedCollectionItemService],
})
export class SavedCollectionItemModule {}
