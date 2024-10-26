import {
	Body,
	Controller,
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
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Between, FindOptionsWhere, ILike } from 'typeorm';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from '../../auth/types';
import { Paginated } from '../../globals/dto/paginated.dto';
import { AdminFindUserDto } from '../dto/admin-find-user.dto';
import { AdminUpdateUserDto } from '../dto/admin-update-user.dto';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('Web/admin/users')
@Controller('web/admin/users')
@UseGuards(AuthGuard, RoleGuard)
export class AdminUsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('brands')
	// @Roles([Role.Admin])
	@Roles(['*'])
	create(@Body() createBrandDto: CreateBrandDto) {
		return this.usersService.createBrand(createBrandDto);
	}

	@Put(':id')
	// @Roles([Role.Admin])
	@Roles(['*'])
	updateShopperProfile(
		@Param('id', ParseIntPipe) id: number,
		@Body() adminUpdateUserDto: AdminUpdateUserDto,
	) {
		return this.usersService.adminUpdate(id, adminUpdateUserDto);
	}

	@Get()
	// @Roles([Role.Admin])
	@Roles(['*'])
	findAll(@Query() adminFindUserDto: AdminFindUserDto, @Query() paginated: Paginated) {
		const baseConditions: FindOptionsWhere<UserEntity> = {
			status: adminFindUserDto.status,
			createdAt: Between(
				adminFindUserDto.RegisteredAfterDate ?? new Date(0),
				adminFindUserDto.RegisteredBeforeDate ?? new Date(),
			),
		};

		const isOutfitterCondition = {
			...(adminFindUserDto.role === Role.Outfitter && { isOutfitter: true }),
			...(adminFindUserDto.role === Role.Shopper && { isOutfitter: false }),
		};

		const shopperProfileConditions: FindOptionsWhere<UserEntity> = {
			...baseConditions,
			shopperProfile: [
				{
					...isOutfitterCondition,
					fullName: ILike(`%${adminFindUserDto.keyword ?? ''}%`),
				},
				{
					...isOutfitterCondition,
					username: ILike(`%${adminFindUserDto.keyword ?? ''}%`),
				},
			],
		};
		const brandProfileConditions: FindOptionsWhere<UserEntity> = {
			...baseConditions,

			brandProfile: [
				{
					categories: { id: adminFindUserDto.categoryId },
					storeName: ILike(`%${adminFindUserDto.keyword ?? ''}%`),
				},
				{
					categories: { id: adminFindUserDto.categoryId },
					brandName: ILike(`%${adminFindUserDto.keyword ?? ''}%`),
				},
			],
		};

		const conditions =
			adminFindUserDto.role === Role.Brand
				? brandProfileConditions
				: adminFindUserDto.role === Role.Shopper ||
					  adminFindUserDto.role === Role.Outfitter
					? shopperProfileConditions
					: [shopperProfileConditions, brandProfileConditions];

		return this.usersService.findAll({
			select: ['id', 'status', 'createdAt', 'email'],
			where: conditions,
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}

	@Get(':id')
	// @Roles([Role.Admin])
	@Roles(['*'])
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.findOneDetailed({ id });
	}
}
