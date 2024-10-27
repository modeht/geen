import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddCategoryEntityDto } from './generated-dtos/add-category-entity.dto'
import { CategoryEntity } from './entities/category.entity'

@Injectable()
export class CategoryService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddCategoryEntityDto){
				return await this.service.create(CategoryEntity, AddCategoryEntityDto, body);
			}
		
}
