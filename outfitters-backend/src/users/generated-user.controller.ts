import { Controller, Post, Body } from '@nestjs/common';
import { AddUserEntityDto } from './generated-dtos/create/create-user-entity.dto'
import { UserService } from './generated-user.service'

@Controller('user')
export class UserController {
  
  constructor(private service: UserService){}
  
			@Post()
			async create(@Body() body: AddUserEntityDto){
				return this.service.createRow(body);
			}
		
}
