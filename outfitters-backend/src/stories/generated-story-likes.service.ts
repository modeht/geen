import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddStoryLikesEntityDto } from './generated-dtos/create/create-story-likes-entity.dto'
import { StoryLikesEntity } from './entities/stories-likes.entity'

@Injectable()
export class StoryLikesService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddStoryLikesEntityDto){
				return await this.service.create(StoryLikesEntity, AddStoryLikesEntityDto, body);
			}
		
}
