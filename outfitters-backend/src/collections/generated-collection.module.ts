import { Module } from '@nestjs/common';
import { CollectionService } from './generated-collection.service';
import { CollectionController } from './generated-collection.controller';

@Module({
	imports: [],
	controllers: [CollectionController],
	providers: [CollectionService],
	exports: [CollectionService],
})
export class CollectionModule {}
