import { Controller, Post, Body } from '@nestjs/common';
import { CreateSavedCollectionEntityDto } from './generated-dtos/create/create-saved-collection-entity.dto'
import { SavedCollectionService } from './generated-saved-collection.service'

@Controller('saved-collection')
export class SavedCollectionController {
  
  constructor(private service: SavedCollectionService){}
  
			@Post()
			async create(@Body() body: CreateSavedCollectionEntityDto){
				return this.service.createRow(body);
			}
		
}
