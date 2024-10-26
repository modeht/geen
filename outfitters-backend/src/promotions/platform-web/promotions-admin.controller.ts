import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Paginated } from '../../globals/dto/paginated.dto';
import { AdminFindPromotionDto } from '../dto/find-promotion.dto';
import { ILike, In } from 'typeorm';
import { PromotionsService } from '../services/promotions.service';

@ApiTags('Web/Admin/Promotions')
@Controller('web/admin/promotions')
@UseGuards(AuthGuard /*RoleGuard*/)
export class PromotionsAdminController {
	constructor(private readonly promotionsService: PromotionsService) {}

	@Get()
	// @Roles([Role.Admin])
	async findAll(
		@Query() findPromotionDto: AdminFindPromotionDto,
		@Query() paginated: Paginated,
	) {
		return this.promotionsService.findAll({
			where: {
				...(findPromotionDto.brandId && { brandId: In(findPromotionDto.brandId) }),
				title: ILike(`%${findPromotionDto.title ?? ''}%`),
				status: findPromotionDto.status,
			},
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
			order: { id: 'DESC' },
		});
	}

	@Get(':id')
	// @Roles([Role.Admin])
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.promotionsService.findOne(id);
	}
}
