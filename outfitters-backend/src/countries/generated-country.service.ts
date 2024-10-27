import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddCountryEntityDto } from './generated-dtos/add-country-entity.dto'
import { CountryEntity } from './entities/countries.entity'

@Injectable()
export class CountryService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddCountryEntityDto){
				return await this.service.create(CountryEntity, AddCountryEntityDto, body);
			}
		
}
