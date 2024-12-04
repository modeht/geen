import { Module } from '@nestjs/common';
import { CommentService } from './generated-comment.service'
import { CommentController } from './generated-comment.controller'

@Module({
  imports:[],
  controllers:[CommentController],
  providers:[CommentService],
  exports:[CommentService],
})
export class CommentModule {}
