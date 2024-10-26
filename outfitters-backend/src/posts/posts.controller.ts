import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Relations } from 'src/globals/decorators/relations.decorator';
import { Paginated } from 'src/globals/dto/paginated.dto';
import { QueryableRelations } from '../globals/lib/type-helpers';
import { CreatePostDto } from './dto/create-post.dto';
import { FindPostsDto, postQueryableRelations } from './dto/find-posts.dto';
import { SetLikeDto } from './dto/set-like.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post()
	create(@Body() createPostDto: CreatePostDto) {
		return this.postsService.create(createPostDto);
	}

	@Get()
	findAll(
		@Query() pagination: Paginated,
		@Query() findPostsDto: FindPostsDto,
		@Relations(postQueryableRelations)
		relations: QueryableRelations<typeof postQueryableRelations>,
	) {
		return this.postsService.findAll(findPostsDto, relations, pagination);
	}

	@Get('feed')
	findFeed(
		@Query() pagination: Paginated,
		@Relations(postQueryableRelations)
		relations: QueryableRelations<typeof postQueryableRelations>,
	) {
		return this.postsService.findFeed(relations, pagination);
	}

	@Get(':id/likes')
	findLikes(@Param('id', ParseIntPipe) id: number, @Query() pagination: Paginated) {
		return this.postsService.findLikes(id, pagination);
	}

	@Get(':id/tagged-brands')
	findTaggedBrands(
		@Param('id', ParseIntPipe) id: number,
		@Query() pagination: Paginated,
	) {
		return this.postsService.findTaggedBrands(id, pagination);
	}
	@Get(':id/tagged-people')
	findTaggedPeople(
		@Param('id', ParseIntPipe) id: number,
		@Query() pagination: Paginated,
	) {
		return this.postsService.findTaggedPeople(id, pagination);
	}

	@Get(':id/tagged-products')
	findTaggedProducts(
		@Param('id', ParseIntPipe) id: number,
		@Query() pagination: Paginated,
	) {
		return this.postsService.findTaggedProducts(id, pagination);
	}

	@Get(':id')
	findOne(
		@Param('id', ParseIntPipe) id: number,
		@Relations(postQueryableRelations)
		relations: QueryableRelations<typeof postQueryableRelations>,
	) {
		return this.postsService.findOne(id, relations);
	}

	// TODO: notify FE & remove this endpoint
	@Put('like/:id')
	setLike(@Param('id', ParseIntPipe) id: number, @Body() setLikeDto: SetLikeDto) {
		return this.postsService.setLike(id, setLikeDto);
	}

	@Put(':id/like')
	addLike(@Param('id', ParseIntPipe) id: number) {
		return this.postsService.setLike(id, { isLiked: true });
	}
	@Delete(':id/like')
	removeLike(@Param('id', ParseIntPipe) id: number) {
		return this.postsService.setLike(id, { isLiked: false });
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.postsService.remove(id);
	}
}
