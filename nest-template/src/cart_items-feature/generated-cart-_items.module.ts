import { Module } from '@nestjs/common';
import { Cart_itemsService } from './generated-cart-_items.service';
import { Cart_itemsController } from './generated-cart-_items.controller';

@Module({
	imports: [],
	controllers: [Cart_itemsController],
	providers: [Cart_itemsService],
	exports: [Cart_itemsService],
})
export class Cart_itemsModule {}
