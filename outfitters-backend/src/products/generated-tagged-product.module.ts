import { Module } from '@nestjs/common';
import { TaggedProductService } from './generated-tagged-product.service'
import { TaggedProductController } from './generated-tagged-product.controller'

@Module({
  imports:[],
  controllers:[TaggedProductController],
  providers:[TaggedProductService],
  exports:[TaggedProductService],
})
export class TaggedProductModule {}
