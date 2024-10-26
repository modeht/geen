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
import { Paginated } from 'src/globals/dto/paginated.dto';
import { SetLikeDto } from 'src/posts/dto/set-like.dto';
import { CreateStoryDto } from './dto/create-story.dto';
import { FindStoriesDto } from './dto/find-stories.dto';
import { StoriesService } from './stories.service';
@ApiTags('stories')
@Controller('stories')
@UseGuards(AuthGuard)
export class StoriesController {
	constructor(private readonly storiesService: StoriesService) {}

	@Post()
	create(@Body() createStoryDto: CreateStoryDto) {
		return this.storiesService.create(createStoryDto);
	}

	@Get()
	findAll(@Query() pagination: Paginated, @Query() findStoriesDto: FindStoriesDto) {
		return this.storiesService.findAll(pagination, findStoriesDto.postedById);
	}

	@Get('feed')
	findFeed(@Query() pagination: Paginated) {
		return this.storiesService.findFeed(pagination);
	}

	@Get(':id/likes')
	findLikes(@Param('id', ParseIntPipe) id: number, @Query() pagination: Paginated) {
		return this.storiesService.findLikes(id, pagination);
	}

	@Get(':id/tagged-brands')
	findTaggedBrands(
		@Param('id', ParseIntPipe) id: number,
		@Query() pagination: Paginated,
	) {
		return this.storiesService.findTaggedBrands(id, pagination);
	}
	@Get(':id/tagged-people')
	findTaggedPeople(
		@Param('id', ParseIntPipe) id: number,
		@Query() pagination: Paginated,
	) {
		return this.storiesService.findTaggedPeople(id, pagination);
	}

	@Get(':id/tagged-products')
	findTaggedProducts(
		@Param('id', ParseIntPipe) id: number,
		@Query() pagination: Paginated,
	) {
		return this.storiesService.findTaggedProducts(id, pagination);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.storiesService.findOne(id);
	}

	// TODO: notify FE and remove this endpoint
	@Put('like/:id')
	setLike(@Param('id', ParseIntPipe) id: number, @Body() setLikeDto: SetLikeDto) {
		return this.storiesService.setLike(id, setLikeDto);
	}
	@Put(':id/like')
	addLike(@Param('id', ParseIntPipe) id: number) {
		return this.storiesService.setLike(id, { isLiked: true });
	}
	@Delete(':id/like')
	removeLike(@Param('id', ParseIntPipe) id: number) {
		return this.storiesService.setLike(id, { isLiked: false });
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.storiesService.remove(id);
	}
}
