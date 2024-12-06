import { Module } from '@nestjs/common';
import { CartItemsService } from './generated-cart-items.service';
import { CartItemsController } from './generated-cart-items.controller';

@Module({
	imports: [],
	controllers: [CartItemsController],
	providers: [CartItemsService],
	exports: [CartItemsService],
})
export class CartItemsModule {}
