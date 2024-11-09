import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddPostLikesEntityDto } from './generated-dtos/create/create-post-likes-entity.dto'
import { PostLikesEntity } from './entities/posts-likes.entity'

@Injectable()
export class PostLikesService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddPostLikesEntityDto){
				return await this.service.create(PostLikesEntity, AddPostLikesEntityDto, body);
			}
		
}
