import { Controller, Post, Body } from '@nestjs/common';
import { AddProductVariantEntityDto } from './generated-dtos/add-product-variant-entity.dto'
import { ProductVariantService } from './generated-product-variant.service'

@Controller('product-variant')
export class ProductVariantController {
  
  constructor(private service: ProductVariantService){}
  
			@Post()
			async create(@Body() body: AddProductVariantEntityDto){
				return this.service.createRow(body);
			}
		
}
