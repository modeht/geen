import { Controller, Post, Body } from '@nestjs/common';
import { AddStoryLikesEntityDto } from './generated-dtos/add-story-likes-entity.dto'
import { StoryLikesService } from './generated-story-likes.service'

@Controller('story-likes')
export class StoryLikesController {
  
  constructor(private service: StoryLikesService){}
  
			@Post()
			async create(@Body() body: AddStoryLikesEntityDto){
				return this.service.createRow(body);
			}
		
}
