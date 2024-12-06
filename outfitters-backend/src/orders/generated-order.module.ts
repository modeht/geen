import { Module } from '@nestjs/common';
import { OrderService } from './generated-order.service';
import { OrderController } from './generated-order.controller';

@Module({
	imports: [],
	controllers: [OrderController],
	providers: [OrderService],
	exports: [OrderService],
})
export class OrderModule {}
