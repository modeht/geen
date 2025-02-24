import { Module } from '@nestjs/common';
import { OrdersService } from './generated-orders.service';
import { OrdersController } from './generated-orders.controller';

@Module({
	imports: [],
	controllers: [OrdersController],
	providers: [OrdersService],
	exports: [OrdersService],
})
export class OrdersModule {}
