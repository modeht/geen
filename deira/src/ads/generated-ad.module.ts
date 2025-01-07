import { Module } from '@nestjs/common';
import { AdService } from './generated-ad.service';
import { AdController } from './generated-ad.controller';

@Module({
	imports: [],
	controllers: [AdController],
	providers: [AdService],
	exports: [AdService],
})
export class AdModule {}
