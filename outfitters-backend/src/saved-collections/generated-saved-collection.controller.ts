import { Controller, Post, Body } from '@nestjs/common';
import { AddSavedCollectionEntityDto } from './generated-dtos/add-saved-collection-entity.dto'
import { SavedCollectionService } from './generated-saved-collection.service'

@Controller('saved-collection')
export class SavedCollectionController {
  
  constructor(private service: SavedCollectionService){}
  
			@Post()
			async create(@Body() body: AddSavedCollectionEntityDto){
				return this.service.createRow(body);
			}
		
}
