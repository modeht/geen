import { Module } from '@nestjs/common';
import { AffiliationLinkTrackingService } from './generated-affiliation-link-tracking.service';
import { AffiliationLinkTrackingController } from './generated-affiliation-link-tracking.controller';

@Module({
	imports: [],
	controllers: [AffiliationLinkTrackingController],
	providers: [AffiliationLinkTrackingService],
	exports: [AffiliationLinkTrackingService],
})
export class AffiliationLinkTrackingModule {}
