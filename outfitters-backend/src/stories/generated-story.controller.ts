import { Controller, Post, Body } from '@nestjs/common';
import { CreateStoryEntityDto } from './generated-dtos/create/create-story-entity.dto'
import { StoryService } from './generated-story.service'

@Controller('story')
export class StoryController {
  
  constructor(private service: StoryService){}
  
			@Post()
			async create(@Body() body: CreateStoryEntityDto){
				return this.service.createRow(body);
			}
		
}
