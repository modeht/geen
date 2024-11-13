import { Controller, Post, Body } from '@nestjs/common';
import { CreatePreferenceEntityDto } from './generated-dtos/create/create-preference-entity.dto'
import { PreferenceService } from './generated-preference.service'

@Controller('preference')
export class PreferenceController {
  
  constructor(private service: PreferenceService){}
  
			@Post()
			async create(@Body() body: CreatePreferenceEntityDto){
				return this.service.createRow(body);
			}
		
}
