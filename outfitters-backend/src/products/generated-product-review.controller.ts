import { Controller, Post, Body } from '@nestjs/common';
import { AddProductReviewEntityDto } from './generated-dtos/add-product-review-entity.dto'
import { ProductReviewService } from './generated-product-review.service'

@Controller('product-review')
export class ProductReviewController {
  
  constructor(private service: ProductReviewService){}
  
			@Post()
			async create(@Body() body: AddProductReviewEntityDto){
				return this.service.createRow(body);
			}
		
}
