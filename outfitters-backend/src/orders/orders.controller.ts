import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Query,
	ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Paginated } from '../globals/dto/paginated.dto';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/types';
import { BrandOrdersService } from './brand-orders.service';
import { RateOrderDto } from './dto/rate-order.dto';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard, RoleGuard)
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly brandOrdersService: BrandOrdersService,
	) {}

	@Post()
	@Roles([Role.Shopper, Role.Outfitter])
	create(@Body() createOrderDto: CreateOrderDto) {
		return this.ordersService.create(createOrderDto);
	}

	@Get()
	@Roles([Role.Shopper, Role.Outfitter])
	findAll(@Query() paginated: Paginated) {
		return this.ordersService.findAll(paginated);
	}

	@Get(':id')
	@Roles([Role.Shopper, Role.Outfitter])
	findOne(@Param('id') id: string) {
		return this.ordersService.findOne(+id);
	}

	@Post(':id/:brandOrderId/rate')
	@Roles([Role.Shopper, Role.Outfitter])
	rate(
		@Param('id', ParseIntPipe) id: number,
		@Param('brandOrderId', ParseIntPipe) brandOrderId: number,
		@Body() rateOrderDto: RateOrderDto,
	) {
		return this.brandOrdersService.rate(id, brandOrderId, rateOrderDto);
	}
}
