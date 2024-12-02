import { Module } from '@nestjs/common';
import { StoryLikesService } from './generated-story-likes.service'
import { StoryLikesController } from './generated-story-likes.controller'

@Module({
  imports:[],
  controllers:[StoryLikesController],
  providers:[StoryLikesService],
  exports:[StoryLikesService],
})
export class StoryLikesModule {}
