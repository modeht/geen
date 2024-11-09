import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddPostEntityDto } from './generated-dtos/create/create-post-entity.dto'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddPostEntityDto){
				return await this.service.create(PostEntity, AddPostEntityDto, body);
			}
		
}
