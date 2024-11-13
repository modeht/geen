import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductEntityDto } from './generated-dtos/create/create-product-entity.dto'
import { ProductService } from './generated-product.service'

@Controller('product')
export class ProductController {
  
  constructor(private service: ProductService){}
  
			@Post()
			async create(@Body() body: CreateProductEntityDto){
				return this.service.createRow(body);
			}
		
}
