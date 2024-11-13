import { Controller, Post, Body } from '@nestjs/common';
import { CreateAffiliationLinkTrackingEntityDto } from './generated-dtos/create/create-affiliation-link-tracking-entity.dto'
import { AffiliationLinkTrackingService } from './generated-affiliation-link-tracking.service'

@Controller('affiliation-link-tracking')
export class AffiliationLinkTrackingController {
  
  constructor(private service: AffiliationLinkTrackingService){}
  
			@Post()
			async create(@Body() body: CreateAffiliationLinkTrackingEntityDto){
				return this.service.createRow(body);
			}
		
}
