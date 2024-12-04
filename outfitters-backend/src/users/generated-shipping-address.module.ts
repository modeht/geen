import { Module } from '@nestjs/common';
import { ShippingAddressService } from './generated-shipping-address.service'
import { ShippingAddressController } from './generated-shipping-address.controller'

@Module({
  imports:[],
  controllers:[ShippingAddressController],
  providers:[ShippingAddressService],
  exports:[ShippingAddressService],
})
export class ShippingAddressModule {}
