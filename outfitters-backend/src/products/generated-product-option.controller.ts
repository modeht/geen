import { Controller, Post, Body } from '@nestjs/common';
import { AddProductOptionEntityDto } from './generated-dtos/create/create-product-option-entity.dto'
import { ProductOptionService } from './generated-product-option.service'

@Controller('product-option')
export class ProductOptionController {
  
  constructor(private service: ProductOptionService){}
  
			@Post()
			async create(@Body() body: AddProductOptionEntityDto){
				return this.service.createRow(body);
			}
		
}
