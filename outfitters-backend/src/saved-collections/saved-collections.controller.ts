import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Paginated } from '../globals/dto/paginated.dto';
import { CreateSavedCollectionDto } from './dto/create-saved-collection.dto';
import { UpdateSavedCollectionDto } from './dto/update-saved-collection.dto';
import { SavedCollectionsService } from './saved-collections.service';

@ApiTags('Saved Collections')
@Controller('saved-collections')
@UseGuards(AuthGuard)
export class SavedCollectionsController {
	constructor(private readonly savedCollectionsService: SavedCollectionsService) {}

	@Post()
	create(@Body() createSavedCollectionDto: CreateSavedCollectionDto) {
		return this.savedCollectionsService.create(createSavedCollectionDto);
	}

	@Get()
	findAll(@Query() paginated: Paginated) {
		return this.savedCollectionsService.findAll(paginated);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.savedCollectionsService.findOne(id);
	}

	@Patch(':id/posts/:postId')
	addPost(@Param('postId', ParseIntPipe) postId: number, @Param('id') id?: string) {
		return this.savedCollectionsService.addPost(postId, id);
	}

	@Patch(':id/products/:productId')
	addProduct(
		@Param('productId', ParseIntPipe) productId: number,
		@Param('id') id?: string,
	) {
		return this.savedCollectionsService.addProduct(productId, id);
	}
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateSavedCollectionDto: UpdateSavedCollectionDto,
	) {
		return this.savedCollectionsService.update(id, updateSavedCollectionDto);
	}

	@Delete(':id/posts/:postId')
	removePost(
		@Param('postId', ParseIntPipe) postId: number,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.savedCollectionsService.removePost(id, postId);
	}

	@Delete(':id/products/:productId')
	removeProduct(
		@Param('productId', ParseIntPipe) productId: number,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.savedCollectionsService.removeProduct(id, productId);
	}
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.savedCollectionsService.remove(id);
	}
}
