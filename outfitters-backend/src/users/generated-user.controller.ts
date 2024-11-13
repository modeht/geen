import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserEntityDto } from './generated-dtos/create/create-user-entity.dto'
import { UserService } from './generated-user.service'

@Controller('user')
export class UserController {
  
  constructor(private service: UserService){}
  
			@Post()
			async create(@Body() body: CreateUserEntityDto){
				return this.service.createRow(body);
			}
		
}
