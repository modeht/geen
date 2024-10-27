import { Module } from '@nestjs/common';
import { PromoCodeService } from './generated-promo-code.service'
import { PromoCodeController } from './generated-promo-code.controller'

@Module({
  imports:[],
  controllers:[PromoCodeController],
  providers:[PromoCodeService],
  exports:[PromoCodeService],
})
export class PromoCodeModule {}
