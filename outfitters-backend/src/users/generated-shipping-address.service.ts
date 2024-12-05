import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateShippingAddressSchema, { TCreateShippingAddressSchemaInput, TCreateShippingAddressSchemaOutput } from './generated-schemas//create-shipping-address.schema'
import UpdateShippingAddressSchema, { TUpdateShippingAddressSchemaInput, TUpdateShippingAddressSchemaOutput } from './generated-schemas//update-shipping-address.schema'
import ReadShippingAddressSchema, { TReadShippingAddressSchemaInput, TReadShippingAddressSchemaOutput } from './generated-schemas//read-shipping-address-query.schema'
import { ShippingAddressEntity } from './entities/shipping-address.entity'

@Injectable()
export class ShippingAddressService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateShippingAddressSchemaOutput){
				return await this.service.create(ShippingAddressEntity, body);
			}

			async updateRow(id: number, body: TUpdateShippingAddressSchemaOutput){
				return await this.service.update(ShippingAddressEntity, id, body);
			}

			async readRows(query: TReadShippingAddressSchemaOutput){
				return await this.service.read(ShippingAddressEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(ShippingAddressEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(ShippingAddressEntity, id, { soft: true });
			}
		
}
