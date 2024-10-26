import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/types';
import { Paginated } from '../globals/dto/paginated.dto';
import { BrandEngagementsService } from './brand-engagements.service';

@ApiTags('Web/brands/engagements')
@Controller('brand-engagements')
@UseGuards(AuthGuard, RoleGuard)
export class BrandEngagementsController {
	constructor(private readonly brandEngagementsService: BrandEngagementsService) {}

	@Get('comments')
	@Roles([Role.Brand])
	async getComments(@Query() paginated: Paginated) {
		return await this.brandEngagementsService.getCommentsEngagement(paginated);
	}

	@Get('likes')
	@Roles([Role.Brand])
	async getLikes(@Query() paginated: Paginated) {
		return await this.brandEngagementsService.getLikesEngagement(paginated);
	}

	@Get('likes/posts')
	@Roles([Role.Brand])
	async getPostsLikes(@Query() paginated: Paginated) {
		return await this.brandEngagementsService.getPostsLikesEngagement(paginated);
	}

	@Get('likes/stories')
	@Roles([Role.Brand])
	async getStoriesLikes(@Query() paginated: Paginated) {
		return await this.brandEngagementsService.getStoriesLikesEngagement(paginated);
	}

	@Get('saves')
	@Roles([Role.Brand])
	async getSaves(@Query() paginated: Paginated) {
		return await this.brandEngagementsService.getSavesEngagement(paginated);
	}

	@Get('shares')
	@Roles([Role.Brand])
	async getShares(@Query() paginated: Paginated) {
		return await this.brandEngagementsService.getSharesEngagement(paginated);
	}
}
