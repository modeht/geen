import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateStoryLikesSchema, { TCreateStoryLikesSchemaInput, TCreateStoryLikesSchemaOutput } from './generated-schemas//create-story-likes.schema'
import UpdateStoryLikesSchema, { TUpdateStoryLikesSchemaInput, TUpdateStoryLikesSchemaOutput } from './generated-schemas//update-story-likes.schema'
import ReadStoryLikesSchema, { TReadStoryLikesSchemaInput, TReadStoryLikesSchemaOutput } from './generated-schemas//read-story-likes-query.schema'
import { StoryLikesEntity } from './entities/stories-likes.entity'

@Injectable()
export class StoryLikesService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateStoryLikesSchemaOutput){
				return await this.service.create(StoryLikesEntity, body);
			}

			async updateRow(id: number, body: TUpdateStoryLikesSchemaOutput){
				return await this.service.update(StoryLikesEntity, id, body);
			}

			async readRows(query: TReadStoryLikesSchemaOutput){
				return await this.service.read(StoryLikesEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(StoryLikesEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(StoryLikesEntity, id, { soft: true });
			}
		
}
