import { Controller, Post, Body } from '@nestjs/common';
import { AddAffiliationLinkEntityDto } from './generated-dtos/add-affiliation-link-entity.dto'
import { AffiliationLinkService } from './generated-affiliation-link.service'

@Controller('affiliation-link')
export class AffiliationLinkController {
  
  constructor(private service: AffiliationLinkService){}
  
			@Post()
			async create(@Body() body: AddAffiliationLinkEntityDto){
				return this.service.createRow(body);
			}
		
}
