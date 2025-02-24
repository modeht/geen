import { Module } from '@nestjs/common';
import { Order_itemsService } from './generated-order-_items.service';
import { Order_itemsController } from './generated-order-_items.controller';

@Module({
	imports: [],
	controllers: [Order_itemsController],
	providers: [Order_itemsService],
	exports: [Order_itemsService],
})
export class Order_itemsModule {}
