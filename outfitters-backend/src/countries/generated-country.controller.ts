import { Controller, Post, Body } from '@nestjs/common';
import { AddCountryEntityDto } from './generated-dtos/add-country-entity.dto'
import { CountryService } from './generated-country.service'

@Controller('country')
export class CountryController {
  
  constructor(private service: CountryService){}
  
			@Post()
			async create(@Body() body: AddCountryEntityDto){
				return this.service.createRow(body);
			}
		
}
