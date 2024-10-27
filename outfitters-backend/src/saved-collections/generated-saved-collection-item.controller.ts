import { Controller, Post, Body } from '@nestjs/common';
import { AddSavedCollectionItemEntityDto } from './generated-dtos/add-saved-collection-item-entity.dto'
import { SavedCollectionItemService } from './generated-saved-collection-item.service'

@Controller('saved-collection-item')
export class SavedCollectionItemController {
  
  constructor(private service: SavedCollectionItemService){}
  
			@Post()
			async create(@Body() body: AddSavedCollectionItemEntityDto){
				return this.service.createRow(body);
			}
		
}
