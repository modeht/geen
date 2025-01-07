import { Module } from '@nestjs/common';
import { PlanService } from './generated-plan.service';
import { PlanController } from './generated-plan.controller';

@Module({
	imports: [],
	controllers: [PlanController],
	providers: [PlanService],
	exports: [PlanService],
})
export class PlanModule {}
