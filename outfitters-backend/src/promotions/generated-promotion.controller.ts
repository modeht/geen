import { Controller, Post, Body } from '@nestjs/common';
import { AddPromotionEntityDto } from './generated-dtos/create/create-promotion-entity.dto'
import { PromotionService } from './generated-promotion.service'

@Controller('promotion')
export class PromotionController {
  
  constructor(private service: PromotionService){}
  
			@Post()
			async create(@Body() body: AddPromotionEntityDto){
				return this.service.createRow(body);
			}
		
}
