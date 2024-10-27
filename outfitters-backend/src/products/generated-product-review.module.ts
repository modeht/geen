import { Module } from '@nestjs/common';
import { ProductReviewService } from './generated-product-review.service'
import { ProductReviewController } from './generated-product-review.controller'

@Module({
  imports:[],
  controllers:[ProductReviewController],
  providers:[ProductReviewService],
  exports:[ProductReviewService],
})
export class ProductReviewModule {}
