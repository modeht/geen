import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddMediaEntityDto } from './generated-dtos/create/create-media-entity.dto'
import { MediaEntity } from './entities/media.entity'

@Injectable()
export class MediaService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddMediaEntityDto){
				return await this.service.create(MediaEntity, AddMediaEntityDto, body);
			}
		
}
