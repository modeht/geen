import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreatePostEntityDto } from './generated-dtos/create/create-post-entity.dto'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreatePostEntityDto){
				return await this.service.create(PostEntity, CreatePostEntityDto, body);
			}
		
}
