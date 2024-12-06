import { Module } from '@nestjs/common';
import { SeasonalPromotionService } from './generated-seasonal-promotion.service';
import { SeasonalPromotionController } from './generated-seasonal-promotion.controller';

@Module({
	imports: [],
	controllers: [SeasonalPromotionController],
	providers: [SeasonalPromotionService],
	exports: [SeasonalPromotionService],
})
export class SeasonalPromotionModule {}
