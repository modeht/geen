import { Controller, Post, Body } from '@nestjs/common';
import { AddCategoryEntityDto } from './generated-dtos/add-category-entity.dto'
import { CategoryService } from './generated-category.service'

@Controller('category')
export class CategoryController {
  
  constructor(private service: CategoryService){}
  
			@Post()
			async create(@Body() body: AddCategoryEntityDto){
				return this.service.createRow(body);
			}
		
}
