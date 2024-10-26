import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('posts/comments')
@Controller('posts/:postId/comments')
@UseGuards(AuthGuard)
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	create(@Param('postId') postId: number, @Body() createCommentDto: CreateCommentDto) {
		return this.commentsService.create(postId, createCommentDto);
	}

	@Post(':id')
	createReply(
		@Param('postId') postId: number,
		@Param('id') id: number,
		@Body() createCommentDto: CreateCommentDto,
	) {
		return this.commentsService.createReply(postId, id, createCommentDto);
	}

	@Get()
	findAll(@Param('postId') postId: number, @Query() paginated: Paginated) {
		return this.commentsService.findAll(postId, paginated);
	}
	@Get(':id')
	findReplies(
		@Param('postId') postId: number,
		@Param('id') id: number,
		@Query('depth') depth: string,
	) {
		return this.commentsService.findReplies(postId, id, +depth);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
		return this.commentsService.update(+id, updateCommentDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.commentsService.remove(+id);
	}
}
