import { Controller, Post, Body } from '@nestjs/common';
import { CreateStoryLikesEntityDto } from './generated-dtos/create/create-story-likes-entity.dto'
import { StoryLikesService } from './generated-story-likes.service'

@Controller('story-likes')
export class StoryLikesController {
  
  constructor(private service: StoryLikesService){}
  
			@Post()
			async create(@Body() body: CreateStoryLikesEntityDto){
				return this.service.createRow(body);
			}
		
}
