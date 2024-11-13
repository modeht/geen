import { Controller, Post, Body } from '@nestjs/common';
import { CreateSavedCollectionItemEntityDto } from './generated-dtos/create/create-saved-collection-item-entity.dto'
import { SavedCollectionItemService } from './generated-saved-collection-item.service'

@Controller('saved-collection-item')
export class SavedCollectionItemController {
  
  constructor(private service: SavedCollectionItemService){}
  
			@Post()
			async create(@Body() body: CreateSavedCollectionItemEntityDto){
				return this.service.createRow(body);
			}
		
}
