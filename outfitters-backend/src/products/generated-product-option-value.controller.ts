import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductOptionValueEntityDto } from './generated-dtos/create/create-product-option-value-entity.dto'
import { ProductOptionValueService } from './generated-product-option-value.service'

@Controller('product-option-value')
export class ProductOptionValueController {
  
  constructor(private service: ProductOptionValueService){}
  
			@Post()
			async create(@Body() body: CreateProductOptionValueEntityDto){
				return this.service.createRow(body);
			}
		
}
