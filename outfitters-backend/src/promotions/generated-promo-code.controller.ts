import { Controller, Post, Body } from '@nestjs/common';
import { AddPromoCodeEntityDto } from './generated-dtos/add-promo-code-entity.dto'
import { PromoCodeService } from './generated-promo-code.service'

@Controller('promo-code')
export class PromoCodeController {
  
  constructor(private service: PromoCodeService){}
  
			@Post()
			async create(@Body() body: AddPromoCodeEntityDto){
				return this.service.createRow(body);
			}
		
}
