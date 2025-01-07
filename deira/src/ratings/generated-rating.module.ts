import { Module } from '@nestjs/common';
import { RatingService } from './generated-rating.service';
import { RatingController } from './generated-rating.controller';

@Module({
	imports: [],
	controllers: [RatingController],
	providers: [RatingService],
	exports: [RatingService],
})
export class RatingModule {}
