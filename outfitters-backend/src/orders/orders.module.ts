import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartsModule } from '../carts/carts.module';
import { ShippingAddressesController } from './shipping-addresses.controller';
import { ShippingAddressesService } from './shipping-addresses.service';
import { BrandOrdersService } from './brand-orders.service';
import { OrdersBrandController } from './platform-web/orders-brand.controller';
import { OrdersAdminController } from './platform-web/orders-admin.controller';

@Module({
	imports: [CartsModule],
	controllers: [
		OrdersController,
		ShippingAddressesController,
		OrdersBrandController,
		OrdersAdminController,
	],
	providers: [OrdersService, ShippingAddressesService, BrandOrdersService],
})
export class OrdersModule {}
