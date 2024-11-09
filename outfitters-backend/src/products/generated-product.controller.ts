import { Controller, Post, Body } from '@nestjs/common';
import { AddProductEntityDto } from './generated-dtos/create/create-product-entity.dto'
import { ProductService } from './generated-product.service'

@Controller('product')
export class ProductController {
  
  constructor(private service: ProductService){}
  
			@Post()
			async create(@Body() body: AddProductEntityDto){
				return this.service.createRow(body);
			}
		
}
