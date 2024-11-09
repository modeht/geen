import { Controller, Post, Body } from '@nestjs/common';
import { AddShippingAddressEntityDto } from './generated-dtos/create/create-shipping-address-entity.dto'
import { ShippingAddressService } from './generated-shipping-address.service'

@Controller('shipping-address')
export class ShippingAddressController {
  
  constructor(private service: ShippingAddressService){}
  
			@Post()
			async create(@Body() body: AddShippingAddressEntityDto){
				return this.service.createRow(body);
			}
		
}
