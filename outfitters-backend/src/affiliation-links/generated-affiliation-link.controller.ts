import { Controller, Post, Body } from '@nestjs/common';
import { CreateAffiliationLinkEntityDto } from './generated-dtos/create/create-affiliation-link-entity.dto'
import { AffiliationLinkService } from './generated-affiliation-link.service'

@Controller('affiliation-link')
export class AffiliationLinkController {
  
  constructor(private service: AffiliationLinkService){}
  
			@Post()
			async create(@Body() body: CreateAffiliationLinkEntityDto){
				return this.service.createRow(body);
			}
		
}
