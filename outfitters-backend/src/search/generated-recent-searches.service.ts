import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateRecentSearchesEntityDto } from './generated-dtos/create/create-recent-searches-entity.dto'
import { RecentSearchesEntity } from './entities/recent-searches.entity'

@Injectable()
export class RecentSearchesService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateRecentSearchesEntityDto){
				return await this.service.create(RecentSearchesEntity, CreateRecentSearchesEntityDto, body);
			}
		
}
