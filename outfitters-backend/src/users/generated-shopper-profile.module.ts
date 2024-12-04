import { Module } from '@nestjs/common';
import { ShopperProfileService } from './generated-shopper-profile.service'
import { ShopperProfileController } from './generated-shopper-profile.controller'

@Module({
  imports:[],
  controllers:[ShopperProfileController],
  providers:[ShopperProfileService],
  exports:[ShopperProfileService],
})
export class ShopperProfileModule {}
