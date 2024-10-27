import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddPreferenceEntityDto } from './generated-dtos/add-preference-entity.dto'
import { PreferenceEntity } from './entities/preference.entity'

@Injectable()
export class PreferenceService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddPreferenceEntityDto){
				return await this.service.create(PreferenceEntity, AddPreferenceEntityDto, body);
			}
		
}
