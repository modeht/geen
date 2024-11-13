import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateTranslationEntityDto } from './generated-dtos/create/create-translation-entity.dto'
import { TranslationEntity } from './entities/translation.entity'

@Injectable()
export class TranslationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateTranslationEntityDto){
				return await this.service.create(TranslationEntity, CreateTranslationEntityDto, body);
			}
		
}
