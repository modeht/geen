import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateTranslationSchema, { TCreateTranslationSchemaInput, TCreateTranslationSchemaOutput } from './generated-schemas//create-translation.schema'
import UpdateTranslationSchema, { TUpdateTranslationSchemaInput, TUpdateTranslationSchemaOutput } from './generated-schemas//update-translation.schema'
import ReadTranslationSchema, { TReadTranslationSchemaInput, TReadTranslationSchemaOutput } from './generated-schemas//read-translation-query.schema'
import { TranslationEntity } from './entities/translation.entity'

@Injectable()
export class TranslationService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateTranslationSchemaOutput){
				return await this.service.create(TranslationEntity, body);
			}

			async updateRow(id: number, body: TUpdateTranslationSchemaOutput){
				return await this.service.update(TranslationEntity, id, body);
			}

			async readRows(query: TReadTranslationSchemaOutput){
				return await this.service.read(TranslationEntity, query);
			}
		
}
