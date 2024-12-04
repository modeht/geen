import { Module } from '@nestjs/common';
import { PromotionService } from './generated-promotion.service'
import { PromotionController } from './generated-promotion.controller'

@Module({
  imports:[],
  controllers:[PromotionController],
  providers:[PromotionService],
  exports:[PromotionService],
})
export class PromotionModule {}
