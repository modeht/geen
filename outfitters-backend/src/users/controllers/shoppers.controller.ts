import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthContext } from '../../auth/auth.context';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { Paginated } from '../../globals/dto/paginated.dto';
import { UpdateShopperProfileDto } from '../dto/update-shopper-profile.dto';
import { ShoppersService } from '../services/shoppers.service';
import { FindUserDto } from '../dto/find-user.dto';
import { ILike } from 'typeorm';

@ApiTags('Shoppers')
@Controller('shoppers')
@UseGuards(AuthGuard, RoleGuard)
export class ShoppersController {
	constructor(
		private readonly shoppersService: ShoppersService,
		private readonly authContext: AuthContext,
	) {}

	@Patch('me')
	@Roles([Role.Shopper, Role.Outfitter])
	async updateMe(@Body() updateShopperProfileDto: UpdateShopperProfileDto) {
		const id = this.authContext.getUser()!.sub;
		return this.shoppersService.update(id, updateShopperProfileDto);
	}

	@Get(':id')
	@Roles(['*'])
	findOne(@Param('id') id: string) {
		return this.shoppersService.findOne({
			where: { id: +id },
		});
	}

	@Get()
	@Roles(['*'])
	findAll(@Query() findUsersDto: FindUserDto, @Query() paginated: Paginated) {
		return this.shoppersService.findAll({
			where: [
				{ fullName: ILike(`%${findUsersDto.keyword ?? ''}%`) },
				{ username: ILike(`%${findUsersDto.keyword ?? ''}%`) },
			],
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}
}
