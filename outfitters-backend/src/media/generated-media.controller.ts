import { Controller, Post, Body } from '@nestjs/common';
import { CreateMediaEntityDto } from './generated-dtos/create/create-media-entity.dto'
import { MediaService } from './generated-media.service'

@Controller('media')
export class MediaController {
  
  constructor(private service: MediaService){}
  
			@Post()
			async create(@Body() body: CreateMediaEntityDto){
				return this.service.createRow(body);
			}
		
}
