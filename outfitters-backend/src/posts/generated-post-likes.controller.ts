import { Controller, Post, Body } from '@nestjs/common';
import { AddPostLikesEntityDto } from './generated-dtos/add-post-likes-entity.dto'
import { PostLikesService } from './generated-post-likes.service'

@Controller('post-likes')
export class PostLikesController {
  
  constructor(private service: PostLikesService){}
  
			@Post()
			async create(@Body() body: AddPostLikesEntityDto){
				return this.service.createRow(body);
			}
		
}
