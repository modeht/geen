import { Controller, UseGuards } from '@nestjs/common';
import { SeasonalPromotionsService } from '../services/seasonal-promotion.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Web/brand/Sesonal-Promotions')
@Controller('web/brand/seasonal-promotions')
@UseGuards(AuthGuard /*RoleGuard*/)
export class SeasonalPromotionsBrandController {
	constructor(private readonly seasonalPromotionsService: SeasonalPromotionsService) {}
}
