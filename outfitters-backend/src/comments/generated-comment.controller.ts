import { Controller, Post, Body } from '@nestjs/common';
import { AddCommentEntityDto } from './generated-dtos/create/create-comment-entity.dto'
import { CommentService } from './generated-comment.service'

@Controller('comment')
export class CommentController {
  
  constructor(private service: CommentService){}
  
			@Post()
			async create(@Body() body: AddCommentEntityDto){
				return this.service.createRow(body);
			}
		
}
