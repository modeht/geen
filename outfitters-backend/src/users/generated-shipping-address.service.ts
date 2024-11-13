import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateShippingAddressEntityDto } from './generated-dtos/create/create-shipping-address-entity.dto'
import { ShippingAddressEntity } from './entities/shipping-address.entity'

@Injectable()
export class ShippingAddressService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateShippingAddressEntityDto){
				return await this.service.create(ShippingAddressEntity, CreateShippingAddressEntityDto, body);
			}
		
}
