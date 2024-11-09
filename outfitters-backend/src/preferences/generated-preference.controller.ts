import { Controller, Post, Body } from '@nestjs/common';
import { AddPreferenceEntityDto } from './generated-dtos/create/create-preference-entity.dto'
import { PreferenceService } from './generated-preference.service'

@Controller('preference')
export class PreferenceController {
  
  constructor(private service: PreferenceService){}
  
			@Post()
			async create(@Body() body: AddPreferenceEntityDto){
				return this.service.createRow(body);
			}
		
}
