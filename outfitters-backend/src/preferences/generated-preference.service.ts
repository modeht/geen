import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreatePreferenceEntityDto } from './generated-dtos/create/create-preference-entity.dto'
import { PreferenceEntity } from './entities/preference.entity'

@Injectable()
export class PreferenceService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreatePreferenceEntityDto){
				return await this.service.create(PreferenceEntity, CreatePreferenceEntityDto, body);
			}
		
}
