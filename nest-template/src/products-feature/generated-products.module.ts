import { Module } from '@nestjs/common';
import { ProductsService } from './generated-products.service';
import { ProductsController } from './generated-products.controller';

@Module({
	imports: [],
	controllers: [ProductsController],
	providers: [ProductsService],
	exports: [ProductsService],
})
export class ProductsModule {}
