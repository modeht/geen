import { Module } from '@nestjs/common';
import { CartService } from './generated-cart.service'
import { CartController } from './generated-cart.controller'

@Module({
  imports:[],
  controllers:[CartController],
  providers:[CartService],
  exports:[CartService],
})
export class CartModule {}
