import { Controller, Post, Body } from '@nestjs/common';
import { CreateSeasonalPromotionEntityDto } from './generated-dtos/create/create-seasonal-promotion-entity.dto'
import { SeasonalPromotionService } from './generated-seasonal-promotion.service'

@Controller('seasonal-promotion')
export class SeasonalPromotionController {
  
  constructor(private service: SeasonalPromotionService){}
  
			@Post()
			async create(@Body() body: CreateSeasonalPromotionEntityDto){
				return this.service.createRow(body);
			}
		
}
