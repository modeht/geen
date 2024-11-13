import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateStoryEntityDto } from './generated-dtos/create/create-story-entity.dto'
import { StoryEntity } from './entities/story.entity'

@Injectable()
export class StoryService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateStoryEntityDto){
				return await this.service.create(StoryEntity, CreateStoryEntityDto, body);
			}
		
}
