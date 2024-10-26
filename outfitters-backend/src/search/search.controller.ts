import { Controller, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Paginated } from '../globals/dto/paginated.dto';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { SearchModeDto } from './dto/search-mode.dto';

@Controller('search')
@UseGuards(AuthGuard)
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get('discover')
	async search(@Query() searchDto: SearchDto, @Query() paginated: Paginated) {
		return this.searchService.searchProducts(searchDto.keyword, paginated);
	}

	@Get('users')
	async searchUsers(@Query() searchDto: SearchDto, @Query() paginated: Paginated) {
		return this.searchService.searchUsers(searchDto.keyword, paginated);
	}

	@Get('recent')
	async findRecentSearches(
		@Query() searchMode: SearchModeDto,
		@Query() paginated: Paginated,
	) {
		return this.searchService.findRecentSearches(searchMode.mode, paginated);
	}

	@Delete()
	async deleteRecentSearches(@Query() searchMode: SearchModeDto) {
		return this.searchService.deleteRecentSearches(searchMode.mode);
	}
}
