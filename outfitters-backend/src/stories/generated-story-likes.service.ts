import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateStoryLikesEntityDto } from './generated-dtos/create/create-story-likes-entity.dto'
import { StoryLikesEntity } from './entities/stories-likes.entity'

@Injectable()
export class StoryLikesService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateStoryLikesEntityDto){
				return await this.service.create(StoryLikesEntity, CreateStoryLikesEntityDto, body);
			}
		
}
