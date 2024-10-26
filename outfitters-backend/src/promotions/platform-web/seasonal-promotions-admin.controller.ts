import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SeasonalPromotionsService } from '../services/seasonal-promotion.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from '../../auth/types';
import { CreateSeasonalPromotionDto } from '../dto/create-seasonal-promotion.dto';

@ApiTags('Web/Admin/Sesonal-Promotions')
@Controller('web/admin/seasonal-promotions')
@UseGuards(AuthGuard /*RoleGuard*/)
export class SeasonalPromotionsAdminController {
	constructor(private readonly seasonalPromotionsService: SeasonalPromotionsService) {}

	@Post()
	@Roles([Role.Admin])
	createSeasonalPromotion(
		@Body() createSeasonalPromotionDto: CreateSeasonalPromotionDto,
	) {
		return this.seasonalPromotionsService.create(createSeasonalPromotionDto);
	}
}
