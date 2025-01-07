import { Module } from '@nestjs/common';
import { UserInterestService } from './generated-user-interest.service';
import { UserInterestController } from './generated-user-interest.controller';

@Module({
	imports: [],
	controllers: [UserInterestController],
	providers: [UserInterestService],
	exports: [UserInterestService],
})
export class UserInterestModule {}
