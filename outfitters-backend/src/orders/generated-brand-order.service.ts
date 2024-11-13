import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateBrandOrderEntityDto } from './generated-dtos/create/create-brand-order-entity.dto'
import { BrandOrderEntity } from './entities/brand-orders.entity'

@Injectable()
export class BrandOrderService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateBrandOrderEntityDto){
				return await this.service.create(BrandOrderEntity, CreateBrandOrderEntityDto, body);
			}
		
}
