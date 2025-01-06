import { Module } from '@nestjs/common';
import { StaticsService } from './statics.service';
import { AppStaticsController } from './statics.controller';
import { AdminStaticsController } from './admin/statics.controller';

@Module({
  controllers: [AppStaticsController, AdminStaticsController],
  providers: [StaticsService],
})
export class StaticsModule {}
