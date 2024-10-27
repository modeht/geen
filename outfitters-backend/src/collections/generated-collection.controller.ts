import { Controller, Post, Body } from '@nestjs/common';
import { AddCollectionEntityDto } from './generated-dtos/add-collection-entity.dto'
import { CollectionService } from './generated-collection.service'

@Controller('collection')
export class CollectionController {
  
  constructor(private service: CollectionService){}
  
			@Post()
			async create(@Body() body: AddCollectionEntityDto){
				return this.service.createRow(body);
			}
		
}
