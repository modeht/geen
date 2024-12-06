import { Module } from '@nestjs/common';
import { ProductVariantService } from './generated-product-variant.service';
import { ProductVariantController } from './generated-product-variant.controller';

@Module({
	imports: [],
	controllers: [ProductVariantController],
	providers: [ProductVariantService],
	exports: [ProductVariantService],
})
export class ProductVariantModule {}
