import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { AddUserEntityDto } from './generated-dtos/add-user-entity.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: AddUserEntityDto){
				return await this.service.create(UserEntity, AddUserEntityDto, body);
			}
		
}
