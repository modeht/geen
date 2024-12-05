import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import CreateShopperProfileSchema, { TCreateShopperProfileSchemaInput, TCreateShopperProfileSchemaOutput } from './generated-schemas//create-shopper-profile.schema'
import UpdateShopperProfileSchema, { TUpdateShopperProfileSchemaInput, TUpdateShopperProfileSchemaOutput } from './generated-schemas//update-shopper-profile.schema'
import ReadShopperProfileSchema, { TReadShopperProfileSchemaInput, TReadShopperProfileSchemaOutput } from './generated-schemas//read-shopper-profile-query.schema'
import { ShopperProfileEntity } from './entities/shopper-profile.entity'

@Injectable()
export class ShopperProfileService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: TCreateShopperProfileSchemaOutput){
				return await this.service.create(ShopperProfileEntity, body);
			}

			async updateRow(id: number, body: TUpdateShopperProfileSchemaOutput){
				return await this.service.update(ShopperProfileEntity, id, body);
			}

			async readRows(query: TReadShopperProfileSchemaOutput){
				return await this.service.read(ShopperProfileEntity, query);
			}

			async deleteRow(id: number){
				return await this.service.delete(ShopperProfileEntity, id);
			}

			async softDeleteRow(id: number){
				return await this.service.delete(ShopperProfileEntity, id, { soft: true });
			}
		
}
