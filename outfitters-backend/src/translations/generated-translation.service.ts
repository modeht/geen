import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddTranslationEntityDto } from './generated-dtos/add-translation-entity.dto'
import { TranslationEntity } from './entities/translation.entity'

@Injectable()
export class TranslationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddTranslationEntityDto){
				return await this.service.create(TranslationEntity, AddTranslationEntityDto, body);
			}
		
}
