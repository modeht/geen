import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddSeasonalPromotionEntityDto } from './generated-dtos/add-seasonal-promotion-entity.dto'
import { SeasonalPromotionEntity } from './entities/seasonal-promotion.entity'

@Injectable()
export class SeasonalPromotionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddSeasonalPromotionEntityDto){
				return await this.service.create(SeasonalPromotionEntity, AddSeasonalPromotionEntityDto, body);
			}
		
}
