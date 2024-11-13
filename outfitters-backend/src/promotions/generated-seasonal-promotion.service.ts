import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateSeasonalPromotionEntityDto } from './generated-dtos/create/create-seasonal-promotion-entity.dto'
import { SeasonalPromotionEntity } from './entities/seasonal-promotion.entity'

@Injectable()
export class SeasonalPromotionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateSeasonalPromotionEntityDto){
				return await this.service.create(SeasonalPromotionEntity, CreateSeasonalPromotionEntityDto, body);
			}
		
}
