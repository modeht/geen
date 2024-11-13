import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateUserEntityDto } from './generated-dtos/create/create-user-entity.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateUserEntityDto){
				return await this.service.create(UserEntity, CreateUserEntityDto, body);
			}
		
}
