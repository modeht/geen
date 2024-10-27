import { Controller, Post, Body } from '@nestjs/common';
import { AddPostEntityDto } from './generated-dtos/add-post-entity.dto'
import { PostService } from './generated-post.service'

@Controller('post')
export class PostController {
  
  constructor(private service: PostService){}
  
			@Post()
			async create(@Body() body: AddPostEntityDto){
				return this.service.createRow(body);
			}
		
}
