import { Controller, Post, Body } from '@nestjs/common';
import { CreatePromoCodeEntityDto } from './generated-dtos/create/create-promo-code-entity.dto'
import { PromoCodeService } from './generated-promo-code.service'

@Controller('promo-code')
export class PromoCodeController {
  
  constructor(private service: PromoCodeService){}
  
			@Post()
			async create(@Body() body: CreatePromoCodeEntityDto){
				return this.service.createRow(body);
			}
		
}
