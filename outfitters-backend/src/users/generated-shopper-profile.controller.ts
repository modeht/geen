import { Controller, Post, Body } from '@nestjs/common';
import { AddShopperProfileEntityDto } from './generated-dtos/create/create-shopper-profile-entity.dto'
import { ShopperProfileService } from './generated-shopper-profile.service'

@Controller('shopper-profile')
export class ShopperProfileController {
  
  constructor(private service: ShopperProfileService){}
  
			@Post()
			async create(@Body() body: AddShopperProfileEntityDto){
				return this.service.createRow(body);
			}
		
}
