import { Module } from '@nestjs/common';
import { BrandEngagementsController } from './brand-engagements.controller';
import { BrandEngagementsService } from './brand-engagements.service';

@Module({
	imports: [],
	controllers: [BrandEngagementsController],
	providers: [BrandEngagementsService],
})
export class BrandEngagementsModule {}
