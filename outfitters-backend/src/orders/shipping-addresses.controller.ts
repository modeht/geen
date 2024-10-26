import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ShippingAddressesService } from './shipping-addresses.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { Paginated } from '../globals/dto/paginated.dto';

@ApiTags('Shipping Addresses')
@Controller('shipping-addresses')
@UseGuards(AuthGuard)
export class ShippingAddressesController {
	constructor(private readonly shippingAddressesService: ShippingAddressesService) {}

	@Post()
	create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
		return this.shippingAddressesService.create(createShippingAddressDto);
	}

	@Get()
	findAll(@Query() paginated: Paginated) {
		return this.shippingAddressesService.findAll(paginated);
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateShippingAddressDto: UpdateShippingAddressDto,
	) {
		return this.shippingAddressesService.update(id, updateShippingAddressDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.shippingAddressesService.remove(id);
	}
}
