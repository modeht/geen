import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { Roles } from '../../auth/decorators/role.decorator';
import { BrandOrdersService } from '../brand-orders.service';
import { AdminFindOrderDto } from '../dto/find-order.dto';
import { Paginated } from '../../globals/dto/paginated.dto';
import { FindOptionsWhere, ILike, In, MoreThanOrEqual, Raw } from 'typeorm';
import { BrandOrderEntity } from '../entities/brand-orders.entity';

@ApiTags('Web/Admin/Orders')
@Controller('web/admin/orders')
@UseGuards(AuthGuard /*RoleGuard*/)
export class OrdersAdminController {
	constructor(private readonly brandOrdersService: BrandOrdersService) {}

	@Get()
	// @Roles([Role.Admin])
	findAll(@Query() adminFindOrderDto: AdminFindOrderDto, @Query() paginated: Paginated) {
		const baseCondition = {
			status: adminFindOrderDto.status,
			order: {
				paymentMethod: adminFindOrderDto.paymentMethod,
			},
			...(adminFindOrderDto.placedAfter && {
				createdAt: MoreThanOrEqual(adminFindOrderDto.placedAfter),
			}),
			...(adminFindOrderDto.brandId && { brandId: In(adminFindOrderDto.brandId) }),
		};

		const shopperProfileCondition = adminFindOrderDto.keyword && {
			shopperProfile: [
				{ username: ILike(`%${adminFindOrderDto.keyword}%`) },
				{ fullName: ILike(`%${adminFindOrderDto.keyword}%`) },
				{ user: { email: ILike(`%${adminFindOrderDto.keyword}%`) } },
			],
		};

		const conditions: FindOptionsWhere<BrandOrderEntity>[] = [
			{
				...baseCondition,
				order: {
					...baseCondition.order,
					...shopperProfileCondition,
				},
			},
			adminFindOrderDto.keyword && {
				...baseCondition,
				id: Raw(
					(alias) => `CAST(${alias} as text) ILike '%${adminFindOrderDto.keyword}%'`,
				),
			},
		];

		return this.brandOrdersService.findAll({
			relations: { brand: true },
			where: conditions,
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}

	@Get(':id')
	// @Roles([Role.Admin])
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.brandOrdersService.findOne({ id });
	}
}
