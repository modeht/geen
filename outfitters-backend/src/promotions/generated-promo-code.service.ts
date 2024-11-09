import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddPromoCodeEntityDto } from './generated-dtos/create/create-promo-code-entity.dto'
import { PromoCodeEntity } from './entities/promo-code.entity'

@Injectable()
export class PromoCodeService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddPromoCodeEntityDto){
				return await this.service.create(PromoCodeEntity, AddPromoCodeEntityDto, body);
			}
		
}
