import { Controller, Post, Body } from '@nestjs/common';
import { AddTaggedProductEntityDto } from './generated-dtos/add-tagged-product-entity.dto'
import { TaggedProductService } from './generated-tagged-product.service'

@Controller('tagged-product')
export class TaggedProductController {
  
  constructor(private service: TaggedProductService){}
  
			@Post()
			async create(@Body() body: AddTaggedProductEntityDto){
				return this.service.createRow(body);
			}
		
}
