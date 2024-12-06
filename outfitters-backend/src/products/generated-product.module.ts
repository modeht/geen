import { Module } from '@nestjs/common';
import { ProductService } from './generated-product.service';
import { ProductController } from './generated-product.controller';

@Module({
	imports: [],
	controllers: [ProductController],
	providers: [ProductService],
	exports: [ProductService],
})
export class ProductModule {}
