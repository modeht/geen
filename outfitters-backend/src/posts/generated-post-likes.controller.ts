import { Controller, Post, Body } from '@nestjs/common';
import { CreatePostLikesEntityDto } from './generated-dtos/create/create-post-likes-entity.dto'
import { PostLikesService } from './generated-post-likes.service'

@Controller('post-likes')
export class PostLikesController {
  
  constructor(private service: PostLikesService){}
  
			@Post()
			async create(@Body() body: CreatePostLikesEntityDto){
				return this.service.createRow(body);
			}
		
}
