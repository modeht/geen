import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateAffiliationLinkEntityDto } from './generated-dtos/create/create-affiliation-link-entity.dto'
import { AffiliationLinkEntity } from './entities/affiliation-link.entity'

@Injectable()
export class AffiliationLinkService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateAffiliationLinkEntityDto){
				return await this.service.create(AffiliationLinkEntity, CreateAffiliationLinkEntityDto, body);
			}
		
}
