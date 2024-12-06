import { Module } from '@nestjs/common';
import { BrandOrderService } from './generated-brand-order.service';
import { BrandOrderController } from './generated-brand-order.controller';

@Module({
	imports: [],
	controllers: [BrandOrderController],
	providers: [BrandOrderService],
	exports: [BrandOrderService],
})
export class BrandOrderModule {}
