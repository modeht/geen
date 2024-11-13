import { Controller, Post, Body } from '@nestjs/common';
import { CreateBrandProfileEntityDto } from './generated-dtos/create/create-brand-profile-entity.dto'
import { BrandProfileService } from './generated-brand-profile.service'

@Controller('brand-profile')
export class BrandProfileController {
  
  constructor(private service: BrandProfileService){}
  
			@Post()
			async create(@Body() body: CreateBrandProfileEntityDto){
				return this.service.createRow(body);
			}
		
}
