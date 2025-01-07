import { Module } from '@nestjs/common';
import { FeedbackService } from './generated-feedback.service';
import { FeedbackController } from './generated-feedback.controller';

@Module({
	imports: [],
	controllers: [FeedbackController],
	providers: [FeedbackService],
	exports: [FeedbackService],
})
export class FeedbackModule {}
