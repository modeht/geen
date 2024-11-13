import { Controller, Post, Body } from '@nestjs/common';
import { CreatePostEntityDto } from './generated-dtos/create/create-post-entity.dto'
import { PostService } from './generated-post.service'

@Controller('post')
export class PostController {
  
  constructor(private service: PostService){}
  
			@Post()
			async create(@Body() body: CreatePostEntityDto){
				return this.service.createRow(body);
			}
		
}
