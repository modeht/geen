import { Module } from '@nestjs/common';
import { ReviewsService } from './generated-reviews.service';
import { ReviewsController } from './generated-reviews.controller';

@Module({
	imports: [],
	controllers: [ReviewsController],
	providers: [ReviewsService],
	exports: [ReviewsService],
})
export class ReviewsModule {}
