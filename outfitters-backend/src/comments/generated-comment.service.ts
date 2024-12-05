import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateCommentSchema, { TCreateCommentSchemaInput, TCreateCommentSchemaOutput } from './generated-schemas//create-comment.schema'
import UpdateCommentSchema, { TUpdateCommentSchemaInput, TUpdateCommentSchemaOutput } from './generated-schemas//update-comment.schema'
import ReadCommentSchema, { TReadCommentSchemaInput, TReadCommentSchemaOutput } from './generated-schemas//read-comment-query.schema'
import { CommentEntity } from './entities/comment.entity'

@Injectable()
export class CommentService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateCommentSchemaOutput){
				return await this.service.create(CommentEntity, body);
			}

			async updateRow(id: number, body: TUpdateCommentSchemaOutput){
				return await this.service.update(CommentEntity, id, body);
			}

			async readRows(query: TReadCommentSchemaOutput){
				return await this.service.read(CommentEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(CommentEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(CommentEntity, id, { soft: true });
			}
		
}
