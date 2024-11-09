import { Controller, Post, Body } from '@nestjs/common';
import { AddProductOptionValueEntityDto } from './generated-dtos/create/create-product-option-value-entity.dto'
import { ProductOptionValueService } from './generated-product-option-value.service'

@Controller('product-option-value')
export class ProductOptionValueController {
  
  constructor(private service: ProductOptionValueService){}
  
			@Post()
			async create(@Body() body: AddProductOptionValueEntityDto){
				return this.service.createRow(body);
			}
		
}
