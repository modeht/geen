import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddShopperProfileEntityDto } from './generated-dtos/create/create-shopper-profile-entity.dto'
import { ShopperProfileEntity } from './entities/shopper-profile.entity'

@Injectable()
export class ShopperProfileService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddShopperProfileEntityDto){
				return await this.service.create(ShopperProfileEntity, AddShopperProfileEntityDto, body);
			}
		
}
