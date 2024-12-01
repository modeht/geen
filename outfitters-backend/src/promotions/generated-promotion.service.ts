import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreatePromotionSchema, { TCreatePromotionSchemaInput, TCreatePromotionSchemaOutput } from './generated-schemas//create-promotion.schema'
import UpdatePromotionSchema, { TUpdatePromotionSchemaInput, TUpdatePromotionSchemaOutput } from './generated-schemas//update-promotion.schema'
import ReadPromotionSchema, { TReadPromotionSchemaInput, TReadPromotionSchemaOutput } from './generated-schemas//read-promotion-query.schema'
import { PromotionEntity } from './entities/promotion.entity'

@Injectable()
export class PromotionService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreatePromotionSchemaOutput){
				return await this.service.create(PromotionEntity, body);
			}

			async updateRow(id: number, body: TUpdatePromotionSchemaOutput){
				return await this.service.update(PromotionEntity, id, body);
			}

			async readRows(query: TReadPromotionSchemaOutput){
				return await this.service.read(PromotionEntity, query);
			}
		
}
