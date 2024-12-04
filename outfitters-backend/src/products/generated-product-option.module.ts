import { Module } from '@nestjs/common';
import { ProductOptionService } from './generated-product-option.service'
import { ProductOptionController } from './generated-product-option.controller'

@Module({
  imports:[],
  controllers:[ProductOptionController],
  providers:[ProductOptionService],
  exports:[ProductOptionService],
})
export class ProductOptionModule {}
