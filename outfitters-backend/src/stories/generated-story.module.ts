import { Module } from '@nestjs/common';
import { StoryService } from './generated-story.service';
import { StoryController } from './generated-story.controller';

@Module({
	imports: [],
	controllers: [StoryController],
	providers: [StoryService],
	exports: [StoryService],
})
export class StoryModule {}
