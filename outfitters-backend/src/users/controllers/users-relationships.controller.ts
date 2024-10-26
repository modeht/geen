import {
	Controller,
	Delete,
	Get,
	Param,
	ParseArrayPipe,
	ParseIntPipe,
	Post,
	Query,
	UnauthorizedException,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthContext } from '../../auth/auth.context';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Paginated } from '../../globals/dto/paginated.dto';
import { UsersRelationshipsService } from '../services/users-relationships.service';

@ApiTags('Users/UsersRelationships')
@Controller('users/:id/relationships')
@UseGuards(AuthGuard)
export class UsersRelationShipsController {
	constructor(
		private readonly usersRelationshipsService: UsersRelationshipsService,
		private readonly authContext: AuthContext,
	) {}

	@Get()
	async getRelationship(@Param('id', ParseIntPipe) id: number) {
		return this.usersRelationshipsService.getRelationship(id);
	}

	@Get('followers')
	async getFollowers(
		@Param('id', ParseIntPipe) id: number,
		@Query() paginated: Paginated,
		@Query('keyword') keyword?: string,
	) {
		return this.usersRelationshipsService.getFollowers(id, paginated, keyword);
	}

	@Get('following')
	async getFollowing(
		@Param('id', ParseIntPipe) id: number,
		@Query() paginated: Paginated,
		@Query('keyword') keyword?: string,
	) {
		return this.usersRelationshipsService.getFollowing(id, paginated, keyword);
	}

	// Does this belong here?
	@Get('brands')
	async getBrands(
		@Param('id', ParseIntPipe) id: number,
		@Query() paginated: Paginated,
		@Query('keyword') keyword?: string,
	) {
		return this.usersRelationshipsService.getBrands(id, paginated, keyword);
	}

	@Get('blocked')
	async getBlocked(
		@Param('id', ParseIntPipe) id: number,
		@Query() paginated: Paginated,
		@Query('keyword') keyword?: string,
	) {
		const userId = this.authContext.getUser().sub;
		if (userId !== id)
			throw new UnauthorizedException('You are not authorized to view this resource');

		return this.usersRelationshipsService.getBlocked(id, paginated, keyword);
	}

	@Post('followMany')
	@UsePipes(new ParseArrayPipe({ items: Number }))
	async followMany(@Query('ids') ids: number[]) {
		return this.usersRelationshipsService.followMany(ids);
	}

	@Post('follow')
	async follow(@Param('id', ParseIntPipe) id: number) {
		return this.usersRelationshipsService.follow(id);
	}
	@Delete('follow')
	async unfollow(@Param('id', ParseIntPipe) id: number) {
		return this.usersRelationshipsService.unfollow(id);
	}

	@Post('block')
	async removeFollower(@Param('id', ParseIntPipe) id: number) {
		return this.usersRelationshipsService.block(id);
	}

	@Delete('block')
	async unblock(@Param('id', ParseIntPipe) id: number) {
		return this.usersRelationshipsService.unblock(id);
	}
}
