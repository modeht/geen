import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreatePromotionEntityDto } from './generated-dtos/create/create-promotion-entity.dto'
import { PromotionEntity } from './entities/promotion.entity'

@Injectable()
export class PromotionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreatePromotionEntityDto){
				return await this.service.create(PromotionEntity, CreatePromotionEntityDto, body);
			}
		
}
