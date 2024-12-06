import { Module } from '@nestjs/common';
import { BrandProfileService } from './generated-brand-profile.service';
import { BrandProfileController } from './generated-brand-profile.controller';

@Module({
	imports: [],
	controllers: [BrandProfileController],
	providers: [BrandProfileService],
	exports: [BrandProfileService],
})
export class BrandProfileModule {}
