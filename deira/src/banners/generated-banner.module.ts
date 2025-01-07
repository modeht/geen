import { Module } from '@nestjs/common';
import { BannerService } from './generated-banner.service';
import { BannerController } from './generated-banner.controller';

@Module({
	imports: [],
	controllers: [BannerController],
	providers: [BannerService],
	exports: [BannerService],
})
export class BannerModule {}
