import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddPromotionEntityDto } from './generated-dtos/add-promotion-entity.dto'
import { PromotionEntity } from './entities/promotion.entity'

@Injectable()
export class PromotionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddPromotionEntityDto){
				return await this.service.create(PromotionEntity, AddPromotionEntityDto, body);
			}
		
}
