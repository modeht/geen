import { Controller, Post, Body } from '@nestjs/common';
import { CreateCountryEntityDto } from './generated-dtos/create/create-country-entity.dto'
import { CountryService } from './generated-country.service'

@Controller('country')
export class CountryController {
  
  constructor(private service: CountryService){}
  
			@Post()
			async create(@Body() body: CreateCountryEntityDto){
				return this.service.createRow(body);
			}
		
}
