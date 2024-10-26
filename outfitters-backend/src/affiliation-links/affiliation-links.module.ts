import { Module } from '@nestjs/common';
import { CollaborationsModule } from 'src/collaborations/collaborations.module';
import { AffiliationLinksController } from './affiliation-links.controller';
import { AffiliationLinksService } from './affiliation-links.service';

@Module({
	controllers: [AffiliationLinksController],
	providers: [AffiliationLinksService],
	imports: [CollaborationsModule],
})
export class AffiliationLinksModule {}
