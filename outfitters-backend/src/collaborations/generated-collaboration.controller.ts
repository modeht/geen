import { Controller, Post, Body } from '@nestjs/common';
import { AddCollaborationEntityDto } from './generated-dtos/create/create-collaboration-entity.dto'
import { CollaborationService } from './generated-collaboration.service'

@Controller('collaboration')
export class CollaborationController {
  
  constructor(private service: CollaborationService){}
  
			@Post()
			async create(@Body() body: AddCollaborationEntityDto){
				return this.service.createRow(body);
			}
		
}
