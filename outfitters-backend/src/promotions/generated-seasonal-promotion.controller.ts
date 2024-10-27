import { Controller, Post, Body } from '@nestjs/common';
import { AddSeasonalPromotionEntityDto } from './generated-dtos/add-seasonal-promotion-entity.dto'
import { SeasonalPromotionService } from './generated-seasonal-promotion.service'

@Controller('seasonal-promotion')
export class SeasonalPromotionController {
  
  constructor(private service: SeasonalPromotionService){}
  
			@Post()
			async create(@Body() body: AddSeasonalPromotionEntityDto){
				return this.service.createRow(body);
			}
		
}
