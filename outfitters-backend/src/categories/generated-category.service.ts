import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateCategorySchema, { TCreateCategorySchemaInput, TCreateCategorySchemaOutput } from './generated-schemas//create-category.schema'
import UpdateCategorySchema, { TUpdateCategorySchemaInput, TUpdateCategorySchemaOutput } from './generated-schemas//update-category.schema'
import ReadCategorySchema, { TReadCategorySchemaInput, TReadCategorySchemaOutput } from './generated-schemas//read-category-query.schema'
import { CategoryEntity } from './entities/category.entity'

@Injectable()
export class CategoryService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateCategorySchemaOutput){
				return await this.service.create(CategoryEntity, body);
			}

			async updateRow(id: number, body: TUpdateCategorySchemaOutput){
				return await this.service.update(CategoryEntity, id, body);
			}

			async readRows(query: TReadCategorySchemaOutput){
				return await this.service.read(CategoryEntity, query);
			}
		
}
