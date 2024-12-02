import { Module } from '@nestjs/common';
import { ProductOptionValueService } from './generated-product-option-value.service'
import { ProductOptionValueController } from './generated-product-option-value.controller'

@Module({
  imports:[],
  controllers:[ProductOptionValueController],
  providers:[ProductOptionValueService],
  exports:[ProductOptionValueService],
})
export class ProductOptionValueModule {}
