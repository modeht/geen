import { Controller, Post, Body } from '@nestjs/common';
import { AddStoryEntityDto } from './generated-dtos/add-story-entity.dto'
import { StoryService } from './generated-story.service'

@Controller('story')
export class StoryController {
  
  constructor(private service: StoryService){}
  
			@Post()
			async create(@Body() body: AddStoryEntityDto){
				return this.service.createRow(body);
			}
		
}
