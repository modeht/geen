import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from '../../auth/types';
import { Paginated } from '../../globals/dto/paginated.dto';
import { AdminFindPromoCodeDto } from '../dto/find-promo-code.dto';
import { FindOptionsWhere, ILike, In } from 'typeorm';
import { PromoCodeEntity } from '../entities/promo-code.entity';
import { PromoCodesService } from '../services/promo-codes.service';

@ApiTags('Web/Admin/Promo-Codes')
@Controller('web/admin/promo-codes')
@UseGuards(AuthGuard /*RoleGuard*/)
export class PromoCodesAdminController {
	constructor(private readonly promoCodesService: PromoCodesService) {}

	@Get()
	// @Roles([Role.Admin])
	async findAll(
		@Query() findPromoCodeDto: AdminFindPromoCodeDto,
		@Query() paginated: Paginated,
	) {
		const baseCondition: FindOptionsWhere<PromoCodeEntity> = {
			status: findPromoCodeDto.status,
			...(findPromoCodeDto.brandId && { brandId: In(findPromoCodeDto.brandId) }),
			...(findPromoCodeDto.outfitterId && {
				shopperId: In(findPromoCodeDto.outfitterId),
			}),
		};

		const shopperProfileCondition = findPromoCodeDto.keyword && {
			...baseCondition,
			shopperProfile: [
				{ username: ILike(`%${findPromoCodeDto.keyword}%`) },
				{ fullName: ILike(`%${findPromoCodeDto.keyword}%`) },
			],
		};

		const brandCondition = findPromoCodeDto.keyword && {
			...baseCondition,
			brand: [
				{ brandName: ILike(`%${findPromoCodeDto.keyword}%`) },
				{ storeName: ILike(`%${findPromoCodeDto.keyword}%`) },
			],
		};

		return this.promoCodesService.findAll({
			where: [baseCondition, shopperProfileCondition, brandCondition],
			take: paginated.limit,
			skip: paginated.limit * paginated.page,
			order: { id: 'DESC' },
			relations: { shopperProfile: { profilePicture: true }, brand: { logo: true } },
		});
	}

	@Get(':id')
	// @Roles([Role.Admin])
	async findOne(@Param('id', ParseIntPipe) id: number) {
		return this.promoCodesService.findOne({ id });
	}
}
