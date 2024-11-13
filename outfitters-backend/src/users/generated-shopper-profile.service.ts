import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateShopperProfileEntityDto } from './generated-dtos/create/create-shopper-profile-entity.dto'
import { ShopperProfileEntity } from './entities/shopper-profile.entity'

@Injectable()
export class ShopperProfileService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateShopperProfileEntityDto){
				return await this.service.create(ShopperProfileEntity, CreateShopperProfileEntityDto, body);
			}
		
}
