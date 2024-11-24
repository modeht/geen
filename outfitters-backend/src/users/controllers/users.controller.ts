import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ILike } from 'typeorm';
import { AuthContext } from '../../auth/auth.context';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Paginated } from '../../globals/dto/paginated.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { MoBody } from '../../categories/categories.controller';
import {
	CreateUserSchema,
	TCreateUserSchemaInput,
} from '../generated-schemas/create-user.schema';

@ApiTags('Users')
@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authContext: AuthContext,
	) {}

	@Get('me')
	async getMe() {
		const id = this.authContext.getUser()!.sub;
		return this.usersService.findOneDetailed({
			id,
		});
	}

	@Patch('me')
	async updateMe(@Body() updateUserDto: UpdateUserDto) {
		const shopperId = this.authContext.getUser()!.sub;
		return this.usersService.update(shopperId, updateUserDto);
	}

	@Get()
	async findAll(@Query() findUsersDto: FindUserDto, @Query() paginated: Paginated) {
		return this.usersService.findAll({
			where: [
				{ shopperProfile: { fullName: ILike(`%${findUsersDto.keyword ?? ''}%`) } },
				{ shopperProfile: { username: ILike(`%${findUsersDto.keyword ?? ''}%`) } },
				{ brandProfile: { storeName: ILike(`%${findUsersDto.keyword ?? ''}%`) } },
				{ brandProfile: { brandName: ILike(`%${findUsersDto.keyword ?? ''}%`) } },
			],

			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}

	@Post('test')
	test(@MoBody(CreateUserSchema) body: TCreateUserSchemaInput) {
		// return body;
		return this.usersService.testCreate(body);
	}
}
