import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductVariantEntityDto } from './generated-dtos/create/create-product-variant-entity.dto'
import { ProductVariantService } from './generated-product-variant.service'

@Controller('product-variant')
export class ProductVariantController {
  
  constructor(private service: ProductVariantService){}
  
			@Post()
			async create(@Body() body: CreateProductVariantEntityDto){
				return this.service.createRow(body);
			}
		
}
