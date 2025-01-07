import { Module } from '@nestjs/common';
import { GovernorateService } from './generated-governorate.service';
import { GovernorateController } from './generated-governorate.controller';

@Module({
	imports: [],
	controllers: [GovernorateController],
	providers: [GovernorateService],
	exports: [GovernorateService],
})
export class GovernorateModule {}
