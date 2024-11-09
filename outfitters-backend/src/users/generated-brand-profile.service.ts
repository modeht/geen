import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddBrandProfileEntityDto } from './generated-dtos/create/create-brand-profile-entity.dto'
import { BrandProfileEntity } from './entities/brand-profile.entity'

@Injectable()
export class BrandProfileService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddBrandProfileEntityDto){
				return await this.service.create(BrandProfileEntity, AddBrandProfileEntityDto, body);
			}
		
}
