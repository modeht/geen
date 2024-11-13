import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateCommentEntityDto } from './generated-dtos/create/create-comment-entity.dto'
import { CommentEntity } from './entities/comment.entity'

@Injectable()
export class CommentService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateCommentEntityDto){
				return await this.service.create(CommentEntity, CreateCommentEntityDto, body);
			}
		
}
