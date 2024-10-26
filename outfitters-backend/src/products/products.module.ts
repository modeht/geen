import { Module } from '@nestjs/common';
import { WebBrandProductVariantsController } from './platform-web/brand-product-variants.controller';
import { WebBrandProductsController } from './platform-web/brand-products.controller';
import { ProductReviewsController } from './product-reviews.controller';
import { ProductReviewsService } from './product-reviews.service';
import { ProductVariantsService } from './product-variants.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
	controllers: [
		WebBrandProductsController,
		WebBrandProductVariantsController,
		ProductsController,
		ProductReviewsController,
	],
	providers: [ProductsService, ProductReviewsService, ProductVariantsService],
	exports: [ProductsService],
})
export class ProductsModule {}
