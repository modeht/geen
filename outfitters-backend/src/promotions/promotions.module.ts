import { Module } from '@nestjs/common';

import { PromotionsBrandController } from './platform-web/promotions-brand.controller';
import { PromoCodesBrandController } from './platform-web/promo-codes-brand.controller';
import { PromotionsService } from './services/promotions.service';
import { PromoCodesService } from './services/promo-codes.service';
import { PromotionsAdminController } from './platform-web/promotions-admin.controller';
import { PromoCodesAdminController } from './platform-web/promo-codes-admin.controller';
import { SeasonalPromotionsService } from './services/seasonal-promotion.service';

@Module({
	controllers: [
		PromotionsBrandController,
		PromoCodesBrandController,
		PromotionsAdminController,
		PromoCodesAdminController,
	],
	providers: [PromotionsService, PromoCodesService, SeasonalPromotionsService],
})
export class PromotionsModule {}
