import { Module } from '@nestjs/common';
import { AffiliationLinkService } from './generated-affiliation-link.service';
import { AffiliationLinkController } from './generated-affiliation-link.controller';

@Module({
	imports: [],
	controllers: [AffiliationLinkController],
	providers: [AffiliationLinkService],
	exports: [AffiliationLinkService],
})
export class AffiliationLinkModule {}
