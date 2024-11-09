import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddShippingAddressEntityDto } from './generated-dtos/create/create-shipping-address-entity.dto'
import { ShippingAddressEntity } from './entities/shipping-address.entity'

@Injectable()
export class ShippingAddressService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddShippingAddressEntityDto){
				return await this.service.create(ShippingAddressEntity, AddShippingAddressEntityDto, body);
			}
		
}
