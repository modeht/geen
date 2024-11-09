import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddRecentSearchesEntityDto } from './generated-dtos/create/create-recent-searches-entity.dto'
import { RecentSearchesEntity } from './entities/recent-searches.entity'

@Injectable()
export class RecentSearchesService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddRecentSearchesEntityDto){
				return await this.service.create(RecentSearchesEntity, AddRecentSearchesEntityDto, body);
			}
		
}
