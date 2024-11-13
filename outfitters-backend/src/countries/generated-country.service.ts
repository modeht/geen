import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateCountryEntityDto } from './generated-dtos/create/create-country-entity.dto'
import { CountryEntity } from './entities/countries.entity'

@Injectable()
export class CountryService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateCountryEntityDto){
				return await this.service.create(CountryEntity, CreateCountryEntityDto, body);
			}
		
}
