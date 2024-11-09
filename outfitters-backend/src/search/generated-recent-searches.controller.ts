import { Controller, Post, Body } from '@nestjs/common';
import { AddRecentSearchesEntityDto } from './generated-dtos/create/create-recent-searches-entity.dto'
import { RecentSearchesService } from './generated-recent-searches.service'

@Controller('recent-searches')
export class RecentSearchesController {
  
  constructor(private service: RecentSearchesService){}
  
			@Post()
			async create(@Body() body: AddRecentSearchesEntityDto){
				return this.service.createRow(body);
			}
		
}
