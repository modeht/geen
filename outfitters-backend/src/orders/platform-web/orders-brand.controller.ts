import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOptionsWhere, ILike, MoreThanOrEqual, Raw } from 'typeorm';
import { AuthContext } from '../../auth/auth.context';
import { Roles } from '../../auth/decorators/role.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/types';
import { Paginated } from '../../globals/dto/paginated.dto';
import { BrandFindOrderDto } from '../dto/find-order.dto';
import { BrandOrderEntity } from '../entities/brand-orders.entity';
import { BrandOrdersService } from './../brand-orders.service';
import { UpdateOrderStatusDto } from '../dto/update-order.dto';

@ApiTags('Web/Brands/Orders')
@Controller('web/brands/orders')
@UseGuards(AuthGuard, RoleGuard)
export class OrdersBrandController {
	constructor(
		private readonly brandOrdersService: BrandOrdersService,
		private readonly authContext: AuthContext,
	) {}

	@Get()
	@Roles([Role.Brand])
	findAll(@Query() brandFindOrderDto: BrandFindOrderDto, @Query() paginated: Paginated) {
		const brandId = this.authContext.getUser()!.sub;
		const baseCondition = {
			brandId,
			status: brandFindOrderDto.status,
			order: {
				paymentMethod: brandFindOrderDto.paymentMethod,
			},
			...(brandFindOrderDto.placedAfter && {
				createdAt: MoreThanOrEqual(brandFindOrderDto.placedAfter),
			}),
		};

		const shopperProfileCondition = brandFindOrderDto.keyword && {
			shopperProfile: [
				{ username: ILike(`%${brandFindOrderDto.keyword}%`) },
				{ fullName: ILike(`%${brandFindOrderDto.keyword}%`) },
				{ user: { email: ILike(`%${brandFindOrderDto.keyword}%`) } },
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
			brandFindOrderDto.keyword && {
				...baseCondition,
				id: Raw(
					(alias) => `CAST(${alias} as text) ILike '%${brandFindOrderDto.keyword}%'`,
				),
			},
		];

		return this.brandOrdersService.findAll({
			where: conditions,
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
		});
	}

	@Get(':id')
	@Roles([Role.Brand])
	findOne(@Param('id', ParseIntPipe) id: number) {
		const brandId = this.authContext.getUser()!.sub;
		return this.brandOrdersService.findOne({ id, brandId });
	}

	@Put(':id')
	@Roles([Role.Brand])
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateOrderStatusDto: UpdateOrderStatusDto,
	) {
		return this.brandOrdersService.updateStatus(id, updateOrderStatusDto.status);
	}
}
