import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddAffiliationLinkTrackingEntityDto } from './generated-dtos/add-affiliation-link-tracking-entity.dto'
import { AffiliationLinkTrackingEntity } from './entities/affiliation-link-tracking.entity'

@Injectable()
export class AffiliationLinkTrackingService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddAffiliationLinkTrackingEntityDto){
				return await this.service.create(AffiliationLinkTrackingEntity, AddAffiliationLinkTrackingEntityDto, body);
			}
		
}
