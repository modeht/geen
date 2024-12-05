import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreatePostSchema, { TCreatePostSchemaInput, TCreatePostSchemaOutput } from './generated-schemas//create-post.schema'
import UpdatePostSchema, { TUpdatePostSchemaInput, TUpdatePostSchemaOutput } from './generated-schemas//update-post.schema'
import ReadPostSchema, { TReadPostSchemaInput, TReadPostSchemaOutput } from './generated-schemas//read-post-query.schema'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreatePostSchemaOutput){
				return await this.service.create(PostEntity, body);
			}

			async updateRow(id: number, body: TUpdatePostSchemaOutput){
				return await this.service.update(PostEntity, id, body);
			}

			async readRows(query: TReadPostSchemaOutput){
				return await this.service.read(PostEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(PostEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(PostEntity, id, { soft: true });
			}
		
}
