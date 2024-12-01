import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateMediaSchema, { TCreateMediaSchemaInput, TCreateMediaSchemaOutput } from './generated-schemas//create-media.schema'
import UpdateMediaSchema, { TUpdateMediaSchemaInput, TUpdateMediaSchemaOutput } from './generated-schemas//update-media.schema'
import ReadMediaSchema, { TReadMediaSchemaInput, TReadMediaSchemaOutput } from './generated-schemas//read-media-query.schema'
import { MediaEntity } from './entities/media.entity'

@Injectable()
export class MediaService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateMediaSchemaOutput){
				return await this.service.create(MediaEntity, body);
			}

			async updateRow(id: number, body: TUpdateMediaSchemaOutput){
				return await this.service.update(MediaEntity, id, body);
			}

			async readRows(query: TReadMediaSchemaOutput){
				return await this.service.read(MediaEntity, query);
			}
		
}
