import { Controller, Post, Body } from '@nestjs/common';
import { CreateTaggedProductEntityDto } from './generated-dtos/create/create-tagged-product-entity.dto'
import { TaggedProductService } from './generated-tagged-product.service'

@Controller('tagged-product')
export class TaggedProductController {
  
  constructor(private service: TaggedProductService){}
  
			@Post()
			async create(@Body() body: CreateTaggedProductEntityDto){
				return this.service.createRow(body);
			}
		
}
