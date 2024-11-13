import { Controller, Post, Body } from '@nestjs/common';
import { CreateCategoryEntityDto } from './generated-dtos/create/create-category-entity.dto'
import { CategoryService } from './generated-category.service'

@Controller('category')
export class CategoryController {
  
  constructor(private service: CategoryService){}
  
			@Post()
			async create(@Body() body: CreateCategoryEntityDto){
				return this.service.createRow(body);
			}
		
}
