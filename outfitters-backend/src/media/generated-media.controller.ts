import { Controller, Post, Body } from '@nestjs/common';
import { AddMediaEntityDto } from './generated-dtos/add-media-entity.dto'
import { MediaService } from './generated-media.service'

@Controller('media')
export class MediaController {
  
  constructor(private service: MediaService){}
  
			@Post()
			async create(@Body() body: AddMediaEntityDto){
				return this.service.createRow(body);
			}
		
}
